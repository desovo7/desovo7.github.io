/*
 * 个人资料统一在这里修改，无需安装或编译。
 * 双语文本写成 { en: "English", zh: "中文" }；只写字符串则两种语言共用。
 * 留空的邮箱、简历、社交链接不会生成无效按钮；空栏目会自动隐藏。
 * 文本里可使用 **加粗**、[链接文字](https://example.com)。
 * 以下只填写已确认的资料；可随时补充头像、研究方向、论文与项目。
 */
window.HOMEPAGE = {
  demo: false,
  profile: {
    name: "Lixiang Wang",
    nativeName: "王励翔",
    initials: "LW",
    role: { en: "Master’s studies", zh: "硕士" },
    institution: { en: "East China Normal University", zh: "华东师范大学" },
    location: "",
    photo: "", // 例如 assets/images/avatar.jpg；留空时显示姓名缩写
    email: "",
    github: "https://github.com/desovo7",
    scholar: "",
    cv: "", // 例如 assets/cv.pdf
    availability: "",
  },
  description: {
    en: "Lixiang Wang (王励翔) — personal homepage. Master’s studies at East China Normal University; undergraduate studies at Qilu University of Technology.",
    zh: "王励翔（Lixiang Wang）的个人主页。硕士阶段就读于华东师范大学，本科阶段就读于齐鲁工业大学。",
  },
  about: [
    {
      en: "I am **Lixiang Wang (王励翔)**. My academic background includes master’s studies at **East China Normal University** and undergraduate studies at **Qilu University of Technology**.",
      zh: "我是 **王励翔（Lixiang Wang）**，硕士阶段就读于 **华东师范大学**，本科阶段就读于 **齐鲁工业大学**。",
    },
    {
      en: "You can find me on [GitHub](https://github.com/desovo7).",
      zh: "欢迎通过 [GitHub](https://github.com/desovo7) 了解我。",
    },
  ],
  interests: [],
  collaboration: "",
  // 动态条目格式：{ date: "2026.10", text: { en: "Update", zh: "动态内容" } }
  news: [],
  // 论文或项目可填写 type、title、authors、venue、image、imageAlt、description、links、bibtex。
  // type 可选 paper 或 project；links 格式：[{ label: "Paper", url: "https://..." }]。
  works: [],
  contributionNote: "",
  experience: [],
  education: [
    {
      date: "",
      title: { en: "East China Normal University", zh: "华东师范大学" },
      organization: { en: "Master’s studies", zh: "硕士阶段" },
      details: "",
      url: "",
    },
    {
      date: "",
      title: { en: "Qilu University of Technology", zh: "齐鲁工业大学" },
      organization: { en: "Bachelor’s studies", zh: "本科阶段" },
      details: "",
      url: "",
    },
  ],
  honors: [
    {
      date: "",
      text: { en: "ICPC EC-FINAL Bronze", zh: "ICPC EC-FINAL 铜奖" },
    },
  ],
  services: [],
  personal: "",
  updated: { en: "October 2026", zh: "2026 年 10 月" }, // 修改内容后也可以更新这里
};
