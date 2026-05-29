# Blog

This is a Jekyll blog designed for GitHub Pages.

## Write a New Post

Create a Markdown file in `_posts/`:

```text
YYYY-MM-DD-post-title.md
```

Each post starts with front matter:

```yaml
---
title: "Post title"
date: 2026-05-29 15:30:00 +0800
categories: notes
tags: [writing, software]
---
```

## Preview Locally

Install Ruby 3.2 or newer and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open:

```text
http://localhost:4000
```

If macOS uses the system Ruby 2.6, install a newer Ruby with `rbenv`, `mise`, or another Ruby version manager first.

## Publish on GitHub Pages

Push this repository to GitHub, then open:

```text
Settings -> Pages
```

Use:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```
