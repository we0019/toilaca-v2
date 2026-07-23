import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/* eslint-disable no-console */

const apiKey = process.env.INTERVALS_API_KEY;
const athleteId = process.env.INTERVALS_ATHLETE_ID;
const apiBase = process.env.INTERVALS_API_BASE ?? "https://intervals.icu/api/v1";
const outputPath =
  process.env.RUNNING_DATA_PATH ?? "src/data/running/activities.json";
const lookbackDays = Number(process.env.INTERVALS_LOOKBACK_DAYS ?? 370);

if (!apiKey || !athleteId) {
  console.log(
    "Skipping Intervals.icu sync: INTERVALS_API_KEY and INTERVALS_ATHLETE_ID are required."
  );
  process.exit(0);
}

const newest = new Date();
const oldest = new Date(newest);
oldest.setDate(oldest.getDate() - lookbackDays);

const url = new URL(`${apiBase}/athlete/${athleteId}/activities`);
url.searchParams.set("oldest", oldest.toISOString().slice(0, 10));
url.searchParams.set("newest", newest.toISOString().slice(0, 10));

const auth = Buffer.from(`API_KEY:${apiKey}`).toString("base64");
const response = await fetch(url, {
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: "application/json",
  },
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(
    `Intervals.icu sync failed: ${response.status} ${response.statusText}\n${body}`
  );
}

const rawActivities = await response.json();
const existing = await readExistingData(outputPath);
const existingById = new Map(
  existing.activities.map(activity => [activity.id, activity])
);

const activities = rawActivities
  .map(normalizeActivity)
  .filter(activity => activity.type === "run")
  .map(activity => ({
    ...existingById.get(activity.id),
    ...activity,
  }))
  .sort((a, b) => b.startDate.localeCompare(a.startDate));

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `${JSON.stringify(
    {
      lastSyncedAt: new Date().toISOString(),
      source: "intervals.icu",
      activities,
    },
    null,
    2
  )}\n`
);

console.log(`Synced ${activities.length} running activities from Intervals.icu.`);

async function readExistingData(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return { activities: [] };
  }
}

function normalizeActivity(activity) {
  const durationSeconds =
    toNumber(activity.moving_time) ??
    toNumber(activity.elapsed_time) ??
    toNumber(activity.duration) ??
    toNumber(activity.icu_moving_time) ??
    null;

  const distanceMeters = toNumber(activity.distance) ?? null;
  const paceSecondsPerKm =
    distanceMeters && durationSeconds
      ? durationSeconds / (distanceMeters / 1000)
      : null;

  return {
    id: String(activity.id),
    title: activity.name || activity.title || "Một buổi chạy",
    type: normalizeType(activity.type || activity.sport || activity.category),
    startDate: activity.start_date_local || activity.start_date || "",
    distanceKm: distanceMeters ? round(distanceMeters / 1000, 2) : null,
    durationSeconds,
    paceSecondsPerKm: paceSecondsPerKm ? Math.round(paceSecondsPerKm) : null,
    elevationGainMeters:
      toNumber(activity.total_elevation_gain) ??
      toNumber(activity.elevation_gain) ??
      null,
    averageHeartRate:
      toNumber(activity.average_heartrate) ??
      toNumber(activity.average_hr) ??
      null,
    trainingLoad:
      toNumber(activity.icu_training_load) ??
      toNumber(activity.training_load) ??
      null,
    source: activity.source || null,
    url: `https://intervals.icu/activities/${activity.id}`,
  };
}

function normalizeType(type) {
  const value = String(type ?? "").toLowerCase();

  if (["run", "running", "trail_run", "trailrun"].includes(value)) {
    return "run";
  }

  return value || "other";
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function round(value, digits) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
