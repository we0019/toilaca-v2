export const ui = {
  nav: {
    home: "Trang chủ",
    posts: "Bài viết",
    tags: "Thẻ",
    running: "Chạy bộ",
    about: "Giới thiệu",
    archives: "Lưu trữ",
    search: "Tìm kiếm",
  },
  post: {
    publishedAt: "Đăng lúc",
    updatedAt: "Cập nhật",
    sharePostIntro: "Chia sẻ bài viết:",
    sharePostOn: "Chia sẻ bài viết trên {{platform}}",
    sharePostViaEmail: "Chia sẻ bài viết qua email",
    tagLabel: "Thẻ",
    backToTop: "Lên đầu trang",
    previousPost: "Bài trước",
    nextPost: "Bài tiếp theo",
  },
  pagination: {
    prev: "Trước",
    next: "Sau",
    page: "Trang",
  },
  home: {
    socialLinks: "Liên kết",
    featured: "Nổi bật",
    recentPosts: "Bài viết gần đây",
    allPosts: "Tất cả bài viết",
  },
  footer: {
    copyright: "Bản quyền",
  },
  pages: {
    tagTitle: "Thẻ",
    tagDesc: "Tất cả bài viết với thẻ",
    tagsTitle: "Thẻ",
    tagsDesc: "Tất cả thẻ đã dùng trong bài viết.",
    postsTitle: "Bài viết",
    postsDesc: "Tất cả bài viết mình đã đăng.",
    archivesTitle: "Lưu trữ",
    archivesDesc: "Tất cả bài viết đã lưu trữ.",
    searchTitle: "Tìm kiếm",
    searchDesc: "Tìm kiếm bài viết ...",
  },
  a11y: {
    skipToContent: "Bỏ qua tới nội dung",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    toggleTheme: "Đổi giao diện",
    searchPlaceholder: "Tìm bài viết...",
    noResults: "Không tìm thấy kết quả",
    goToPreviousPage: "Tới trang trước",
    goToNextPage: "Tới trang sau",
  },
  notFound: {
    title: "404 Không tìm thấy",
    message: "Không tìm thấy trang",
    goHome: "Quay về trang chủ",
  },
};

export function tplStr(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = vars[key];
    return value !== undefined && value !== null ? String(value) : "";
  });
}
