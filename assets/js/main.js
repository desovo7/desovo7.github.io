(() => {
  "use strict";

  const data = window.HOMEPAGE;
  if (!data) return;
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  let savedLanguage;
  try { savedLanguage = localStorage.getItem("homepage-language"); } catch { /* Storage can be unavailable for local files. */ }
  const language = ["en", "zh"].includes(requestedLanguage) ? requestedLanguage : savedLanguage === "zh" ? "zh" : "en";
  const isChinese = language === "zh";
  const t = (value) => value && typeof value === "object" ? value[language] ?? value.en ?? value.zh ?? "" : value;
  const ui = (en, zh) => isChinese ? zh : en;
  document.documentElement.lang = isChinese ? "zh-CN" : "en";
  const $ = (selector) => document.querySelector(selector);
  const escapeHTML = (value) => String(t(value) ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  const staticLabels = {
    '.skip-link': ["Skip to content", "跳到正文"],
    '.brand-label': ["Homepage", "个人主页"],
    '#navigation a[href="#about"]': ["About", "关于我"],
    '#navigation a[href="#news"]': ["News", "动态"],
    '#navigation a[href="#publications"]': ["Publications", "研究成果"],
    '#navigation a[href="#experience"]': ["Experience", "经历"],
    '#navigation a[href="#education"]': ["Education", "教育"],
    '#navigation a[href="#more"]': ["More", "更多"],
    '.eyebrow': ["A LITTLE ABOUT ME", "保持好奇，持续探索"],
    '.section-aside': ["LATEST UPDATES", "最近更新"],
    '.filter-button[data-filter="all"]': ["All work", "全部成果"],
    '.filter-button[data-filter="paper"]': ["Publications", "论文"],
    '.filter-button[data-filter="project"]': ["Projects", "项目"],
    '#honors-block h3': ["Honors & Awards", "荣誉与奖励"],
    '#services-block h3': ["Academic Service", "学术服务"],
  };
  Object.entries(staticLabels).forEach(([selector, labels]) => { $(selector).textContent = ui(...labels); });
  $("#about-title").innerHTML = `${ui("About Me", "关于我")}<span class="heading-dot">.</span>`;
  Object.entries({ news: ["News", "最新动态"], publications: ["Selected Work", "研究成果"], experience: ["Experience", "研究与实习经历"], education: ["Education", "教育经历"], more: ["A Little More", "更多关于我"] }).forEach(([id, labels]) => {
    const heading = $(`#${id}-title`);
    heading.lastChild.textContent = ui(...labels);
  });
  $("#template-note").innerHTML = `<span class="status-dot"></span>${ui("Template preview", "模板预览")}<span class="note-separator">/</span><span>${ui("Personal details to be added", "个人资料待补充")}</span>`;
  $("#language-toggle").innerHTML = `${ui("中文", "EN")} <span aria-hidden="true">⇄</span>`;
  $("#language-toggle").setAttribute("aria-label", ui("切换为中文", "Switch to English"));
  $("#language-toggle").addEventListener("click", () => {
    const nextLanguage = isChinese ? "en" : "zh";
    try { localStorage.setItem("homepage-language", nextLanguage); } catch { /* URL parameter remains usable without storage. */ }
    const nextURL = new URL(window.location.href);
    nextURL.searchParams.set("lang", nextLanguage);
    window.location.assign(nextURL.href);
  });
  $("#navigation").setAttribute("aria-label", ui("Main navigation", "主导航"));
  $(".brand").setAttribute("aria-label", ui("Homepage", "个人主页"));
  $("#profile").setAttribute("aria-label", ui("Personal profile", "个人资料"));
  $("#research-interests").setAttribute("aria-label", ui("Research interests", "研究方向"));
  $(".work-filters").setAttribute("aria-label", ui("Filter selected work", "筛选研究成果"));
  $("#back-to-top").setAttribute("aria-label", ui("Back to top", "返回顶部"));
  $(".dialog-close").setAttribute("aria-label", ui("Close citation", "关闭引用"));

  // Only allow web, mail, and local asset links. All content is rendered as text.
  const safeURL = (value, allowMail = false) => {
    if (typeof value !== "string" || !value.trim()) return "";
    const url = value.trim();
    if (/[\u0000-\u0020]/.test(url)) return "";
    if (/^https?:\/\//i.test(url) || (allowMail && /^mailto:[^@]+@[^@]+$/i.test(url))) return url;
    if (!/^[a-z][a-z\d+.-]*:/i.test(url) && !url.startsWith("//") && !url.startsWith("#")) return url;
    return "";
  };
  const linkHTML = (label, url, className = "") => {
    const safe = safeURL(url, true);
    if (!safe) return escapeHTML(label);
    const external = /^https?:/i.test(safe) ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeHTML(safe)}"${external}${className ? ` class="${className}"` : ""}>${label}</a>`;
  };
  const formatText = (value) => {
    // Small, deliberate Markdown subset: links and bold text, never arbitrary HTML.
    const parts = String(t(value) ?? "").split(/(\[[^\]]+\]\([^\s)]+\))/g);
    const bold = (text) => escapeHTML(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    return parts.map((part) => {
      const match = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
      return match ? linkHTML(bold(match[1]), match[2]) : bold(part);
    }).join("");
  };
  const example = (item) => item.example ? `<span class="example-badge">${ui("Example", "示例")}</span>` : "";
  const icon = (name) => {
    const paths = {
      location: '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
      github: '<path d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 6v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3a5.7 5.7 0 0 0-1.5-4 5.3 5.3 0 0 0-.1-4S18-1.4 15 1.5a14 14 0 0 0-6 0C6-1.4 4.8 0 4.8 0a5.3 5.3 0 0 0-.1 4 5.7 5.7 0 0 0-1.5 4c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 9 18v4" transform="translate(0 1) scale(.94)"/>',
      scholar: '<path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6m4-2v8"/>',
      document: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8m-8 4h6"/>',
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ""}</svg>`;
  };

  const profile = data.profile || {};
  const name = t(profile.name) || "Your Name";
  const initials = profile.initials || name.split(/\s+/).map((word) => word[0]).slice(0, 2).join("");
  document.title = `${name}${profile.nativeName ? ` (${t(profile.nativeName)})` : ""} · ${ui("Homepage", "个人主页")}`;
  $('meta[name="description"]').content = t(data.description) || `${name}'s personal academic homepage.`;
  $("#brand-initials").innerHTML = `${escapeHTML(initials)}<span>.</span>`;
  $("#template-note").hidden = !data.demo;

  const avatar = `<div class="avatar-placeholder" role="img" aria-label="${escapeHTML(name)}${ui("'s initials", "的姓名缩写")}"><span class="avatar-initials">${escapeHTML(initials)}</span><span class="avatar-caption">${data.demo ? ui("YOUR PHOTO HERE", "个人照片待补充") : ""}</span></div>`;
  const photoURL = safeURL(profile.photo);
  const contact = (label, url, iconName) => safeURL(url, true)
    ? linkHTML(`${icon(iconName)}<span>${escapeHTML(label)}</span><span class="link-arrow" aria-hidden="true">↗</span>`, url, "profile-link")
    : (data.demo ? `<span class="profile-link missing">${icon(iconName)}<span>${escapeHTML(label)}</span><span class="missing-label">${ui("to add", "待补充")}</span></span>` : "");
  $("#profile").innerHTML = `
    <div class="profile-photo">${photoURL ? `<img src="${escapeHTML(photoURL)}" alt="${escapeHTML(name)}" width="224" height="244">` : avatar}</div>
    <div class="profile-information">
      <h2 class="profile-name">${escapeHTML(name)}</h2>
      ${profile.nativeName ? `<p class="native-name">${escapeHTML(profile.nativeName)}</p>` : ""}
      ${profile.role ? `<p class="profile-role">${escapeHTML(profile.role)}</p>` : ""}
      ${profile.institution ? `<p class="profile-institution">${escapeHTML(profile.institution)}</p>` : ""}
      ${profile.location ? `<p class="profile-location">${icon("location")}<span>${escapeHTML(profile.location)}</span></p>` : ""}
      <div class="profile-links">
        ${contact(ui("Email", "邮箱"), profile.email ? `mailto:${profile.email}` : "", "email")}
        ${contact("GitHub", profile.github, "github")}
        ${contact(ui("Google Scholar", "谷歌学术"), profile.scholar, "scholar")}
        ${profile.cv ? contact(ui("Curriculum Vitae", "个人简历"), profile.cv, "document") : ""}
      </div>
      ${profile.availability ? `<p class="profile-availability"><span class="status-dot"></span>${escapeHTML(profile.availability)}</p>` : ""}
    </div>`;
  if (photoURL) {
    $(".profile-photo img").addEventListener("error", () => { $(".profile-photo").innerHTML = avatar; }, { once: true });
  }

  $("#about-content").innerHTML = (data.about || []).map((paragraph) => `<p>${formatText(paragraph)}</p>`).join("");
  $("#research-interests").innerHTML = (data.interests || []).map((interest) => `<span>${escapeHTML(interest)}</span>`).join("");
  $("#research-interests").hidden = !(data.interests || []).length;
  $("#collaboration-note").innerHTML = formatText(data.collaboration || "");
  $("#collaboration-note").hidden = !data.collaboration;

  const hideSection = (id, isEmpty) => {
    $(`#${id}`).hidden = isEmpty;
    const nav = $(`#navigation a[href="#${id}"]`);
    if (nav) nav.hidden = isEmpty;
  };
  const news = data.news || [];
  $("#news-list").innerHTML = news.map((item, index) => `<div class="news-item"${index >= 3 ? " hidden" : ""}><span class="news-date">${escapeHTML(item.date)}</span><div class="news-body">${formatText(item.text)} ${example(item)}</div></div>`).join("");
  hideSection("news", !news.length);
  $("#news-toggle").hidden = news.length <= 3;
  $("#news-toggle").innerHTML = `${ui("Show all updates", "展开全部动态")} <span aria-hidden="true">↓</span>`;
  $("#news-toggle").addEventListener("click", () => {
    const expanded = $("#news-toggle").getAttribute("aria-expanded") !== "true";
    $("#news-toggle").setAttribute("aria-expanded", String(expanded));
    $("#news-toggle").innerHTML = expanded ? `${ui("Show fewer updates", "收起历史动态")} <span aria-hidden="true">↑</span>` : `${ui("Show all updates", "展开全部动态")} <span aria-hidden="true">↓</span>`;
    document.querySelectorAll(".news-item").forEach((item, index) => { item.hidden = !expanded && index >= 3; });
  });

  const works = data.works || [];
  const renderWorks = (filter = "all") => {
    const shown = works.map((work, index) => ({ ...work, index })).filter((work) => filter === "all" || work.type === filter);
    $("#work-count").textContent = `${String(shown.length).padStart(2, "0")} ${ui(shown.length === 1 ? "item" : "items", "项")}`;
    $("#work-list").innerHTML = shown.map((work) => {
      const image = safeURL(work.image);
      const titleLink = (work.links || []).find((link) => safeURL(link.url));
      const title = formatText(work.title);
      return `<article class="work-item">
        <div class="work-image">${image ? `<img src="${escapeHTML(image)}" alt="${escapeHTML(work.imageAlt || work.title)}" width="520" height="320" loading="lazy">` : '<div class="work-image-placeholder" aria-hidden="true">↗</div>'}<span class="venue-badge ${work.type === "project" ? "project-badge" : ""}">${escapeHTML(work.venue || (work.type === "project" ? "Project" : "Publication"))}</span></div>
        <div class="work-content"><div class="work-title-row"><h3>${titleLink ? linkHTML(title, titleLink.url) : title}</h3>${example(work)}</div>
          <p class="work-authors">${formatText(work.authors)}</p>
          <p class="work-description">${formatText(work.description)}</p>
          <div class="work-links">${(work.links || []).filter((link) => safeURL(link.url)).map((link) => linkHTML(escapeHTML(link.label), link.url, "work-link")).join("")}${work.bibtex ? `<button class="work-link citation-button" data-work-index="${work.index}">${work.example ? ui("Example BibTeX", "BibTeX 示例") : "BibTeX"}<span aria-hidden="true">↗</span></button>` : ""}</div>
        </div></article>`;
    }).join("") || `<p class="empty-state">${ui("No work in this category yet.", "该分类暂无成果。")}</p>`;
  };
  renderWorks();
  hideSection("publications", !works.length);
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach((other) => {
        other.classList.toggle("active", other === button);
        other.setAttribute("aria-pressed", String(other === button));
      });
      renderWorks(button.dataset.filter);
    });
  });
  $("#contribution-note").textContent = t(data.contributionNote) || "";
  $("#contribution-note").hidden = !data.contributionNote;
  if (safeURL(profile.scholar)) {
    $("#scholar-link").href = safeURL(profile.scholar);
    $("#scholar-link").target = "_blank";
    $("#scholar-link").rel = "noopener noreferrer";
    $("#scholar-link").hidden = false;
    $("#scholar-link").innerHTML = `${ui("Google Scholar", "谷歌学术")} <span aria-hidden="true">↗</span>`;
  }

  const renderTimeline = (items, selector) => {
    $(selector).innerHTML = items.map((item) => `<div class="timeline-item${t(item.date) ? "" : " no-date"}">${t(item.date) ? `<div class="timeline-date">${escapeHTML(item.date)}</div>` : '<span class="timeline-marker" aria-hidden="true"></span>'}<div class="timeline-content"><h3>${item.url && safeURL(item.url) ? linkHTML(escapeHTML(item.title), item.url) : escapeHTML(item.title)} ${example(item)}</h3><p class="timeline-organization">${escapeHTML(item.organization)}</p>${item.details ? `<p class="timeline-details">${formatText(item.details)}</p>` : ""}</div></div>`).join("");
  };
  renderTimeline(data.experience || [], "#experience-list");
  renderTimeline(data.education || [], "#education-list");
  hideSection("experience", !(data.experience || []).length);
  hideSection("education", !(data.education || []).length);
  const renderSimpleList = (items, selector) => {
    $(selector).innerHTML = items.map((item) => `<li><span class="list-date">${escapeHTML(item.date)}</span><span>${formatText(item.text)} ${example(item)}</span></li>`).join("");
  };
  renderSimpleList(data.honors || [], "#honors-list");
  renderSimpleList(data.services || [], "#services-list");
  $("#honors-block").hidden = !(data.honors || []).length;
  $("#services-block").hidden = !(data.services || []).length;
  $("#personal-note").innerHTML = data.personal ? `<span class="personal-note-symbol" aria-hidden="true">☕</span><p>${formatText(data.personal)}</p>` : "";
  $("#personal-note").hidden = !data.personal;
  hideSection("more", !(data.honors || []).length && !(data.services || []).length && !data.personal);
  const visibleSections = document.querySelectorAll("main > section:not([hidden])").length;
  document.body.classList.toggle("compact-homepage", visibleSections <= 3);
  // Keep the page year aligned to the owner's timezone.
  $("#copyright").textContent = `© ${new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "Asia/Shanghai" }).format(new Date())} ${name}`;
  $("#updated").textContent = data.updated ? `${ui("Last updated", "最近更新")} · ${t(data.updated)}` : "";

  const menu = $(".menu-toggle");
  const setMenu = (open) => {
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? ui("Close navigation", "关闭导航") : ui("Open navigation", "展开导航"));
    $("#navigation").classList.toggle("is-open", open);
  };
  setMenu(false);
  menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
  document.querySelectorAll("#navigation a").forEach((anchor) => anchor.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", (event) => { if (!event.target.closest(".header-inner")) setMenu(false); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });

  if ("IntersectionObserver" in window) {
    const sections = [...document.querySelectorAll("main > section")].filter((section) => !section.hidden);
    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id));
      const current = sections.find((section) => visible.has(section.id));
      if (!current) return;
      document.querySelectorAll("#navigation a").forEach((anchor) => {
        const active = anchor.hash === `#${current.id}`;
        anchor.classList.toggle("active", active);
        if (active) anchor.setAttribute("aria-current", "location");
        else anchor.removeAttribute("aria-current");
      });
    }, { rootMargin: "-100px 0px -45% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }

  const dialog = $("#citation-dialog");
  $("#work-list").addEventListener("click", (event) => {
    const button = event.target.closest(".citation-button");
    if (!button) return;
    const work = works[Number(button.dataset.workIndex)];
    $("#citation-title").textContent = work.example ? ui("Example BibTeX", "BibTeX 示例") : "BibTeX";
    $("#citation-description").textContent = work.example ? ui("This is a placeholder citation. Replace it with the BibTeX for your own paper.", "这是占位引用，请替换为你自己的论文的 BibTeX。") : t(work.title);
    $("#citation-code").textContent = work.bibtex;
    $("#copy-status").textContent = "";
    $("#copy-citation").textContent = ui("Copy BibTeX", "复制 BibTeX");
    dialog.showModal();
  });
  $(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  $("#copy-citation").addEventListener("click", async () => {
    const citation = $("#citation-code").textContent;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(citation);
      $("#copy-status").textContent = ui("Copied to clipboard", "已复制到剪贴板");
      $("#copy-citation").textContent = ui("Copied ✓", "已复制 ✓");
    } catch {
      const range = document.createRange();
      range.selectNodeContents($("#citation-code"));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      $("#copy-status").textContent = ui("Text selected — press Ctrl+C or ⌘C to copy.", "已选中文本，请按 Ctrl+C 或 ⌘C 复制。");
    }
  });

  const topButton = $("#back-to-top");
  const syncTopButton = () => { topButton.hidden = window.scrollY < 550; };
  window.addEventListener("scroll", syncTopButton, { passive: true });
  syncTopButton();
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }));
})();
