import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://toilaca.com/",
    title: "toilaca",
    description: "Một chiếc blog giản đơn về cuộc sống.",
    author: "Trong Luu",
    profile: "https://toilaca.com/",
    ogImage: "default-og.jpg",
    lang: "vi",
    timezone: "Asia/Bangkok",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    showArchives: true,
  },
  socials: [
    { name: "facebook", url: "https://www.facebook.com/luutrong194/" },
    { name: "mail",     url: "mailto:sasory.hp19@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
