export const SITE = {
  website: "https://che1sy.dev/",
  author: "che1sy",
  profile: "https://che1sy.dev/",
  desc: "探索技术，分享知识，记录生活",
  title: "che1sy的小站",
  ogImage: "che1sy-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "编辑此页面",
    url: "https://github.com/che1sy/che1sy.dev/edit/main/",
  },
  dynamicOgImage: true,
  lang: "zh", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
