# 王励翔 · 个人主页

面向 [desovo7.github.io](https://desovo7.github.io/) 的中英文个人主页，参考 [Zihan Wang 的主页](https://zethwang.github.io/) 的学术布局。使用 HTML、CSS 和 JavaScript，无需安装依赖或编译。

当前资料仅包含已确认的姓名、GitHub 账号，以及华东师范大学硕士、齐鲁工业大学本科经历。研究方向、论文、动态等尚未提供的栏目自动隐藏。页面支持 **EN / 中文** 切换，并记住浏览器上次选择的语言。

## 日常维护

主要修改 `assets/js/content.js` 中的 `window.HOMEPAGE`。文字可以是普通字符串，也可以是 `{ en: "English", zh: "中文" }`；网址、邮箱和文件路径填写普通字符串。保留引号、逗号和括号。空数组 `[]` 会隐藏对应栏目，空联系方式不会生成按钮。

- `profile`：姓名、身份、学校、头像与联系方式。
- `about`、`interests`：简介与研究方向。
- `news`、`works`、`experience`、`education`：动态、成果、经历和教育背景。
- `honors`、`services`、`personal`：荣誉、学术服务与个人介绍。
- `updated`：页面显示的最近更新日期。

头像或论文图片可放到 `assets/images/`，再填写相对路径，例如 `assets/images/avatar.jpg`；简历可放到 `assets/cv.pdf`。没有图片时可继续留空。配色与布局在 `assets/css/style.css` 中修改；通常无需编辑 `assets/js/main.js` 或 `index.html`。

添加论文时，在 `works` 数组中填写一个条目。以下仅说明格式，请替换成真实内容和链接后使用：

```js
works: [{
  type: "paper", // 项目使用 "project"
  title: { en: "Paper title", zh: "论文标题" },
  authors: "**Lixiang Wang**, Collaborator",
  venue: "Conference · Year",
  image: "", // 可填 assets/images/paper.jpg
  imageAlt: { en: "Paper overview", zh: "论文概览" },
  description: { en: "A brief contribution summary.", zh: "简要介绍论文贡献。" },
  links: [], // 例如 [{ label: "Paper", url: "你的真实论文网址" }]
  bibtex: "", // 可填写论文的 BibTeX
}],
```

修改后打开 `index.html`，分别检查中英文内容。当前 `demo: false`；如以后复制带有 `example: true` 的示例条目，请在填好真实内容后删除该字段或改为 `false`。

## GitHub Pages 发布与更新

仓库是 [desovo7/desovo7.github.io](https://github.com/desovo7/desovo7.github.io)，目标网址为 [desovo7.github.io](https://desovo7.github.io/)。已选择用新版个人主页取代旧博客；旧内容可从仓库的 Git 提交历史恢复。根目录的 `.nojekyll` 用于直接发布这份静态主页，避免继续使用旧博客的 Jekyll 构建。[官方静态站点说明](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

如需手动发布或重新设置：

1. 打开仓库的 `main` 分支，选择 **Add file → Upload files**，上传 `index.html`、完整的 `assets` 文件夹和 `.nojekyll`，保持目录结构；入口应在仓库根目录。[官方上传说明](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
2. `.nojekyll` 是隐藏文件，Mac 可按 **Command + Shift + .** 显示。如果遗漏，可通过 **Add file → Create new file** 创建同名空文件并提交。
3. 在 [Settings → Pages](https://github.com/desovo7/desovo7.github.io/settings/pages) 选择 **Deploy from a branch → main → / (root)**，点击 **Save**。[官方发布来源设置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
4. 在 **Actions** 确认部署结果，再到 Pages 设置页点击 **Visit site**。更新可能需要最多约 10 分钟。[官方快速入门](https://docs.github.com/en/pages/quickstart)

后续提交到 `main` 的更新会触发发布。若页面未更新，先确认部署完成再强制刷新；图片或样式缺失时，检查文件路径及大小写；出现 404 时检查 `index.html` 的位置与 Pages 发布来源。
