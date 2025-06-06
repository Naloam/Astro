export const SITE = {
  website: "https://che1sy.netlify.app/",
  author: "che1sy",
  profile: "https://che1sy.netlify.app/",
  desc: "che1sy的小站",
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
    url: "https://github.com/Naloam/Astro/blob/main/",
  },
  dynamicOgImage: true,
  lang: "zh", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/China", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
