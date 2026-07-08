# My Toolbox

个人工具箱网站。把固定格式的 Markdown 文件放进 `content/tools/`，构建时会自动生成首页分类模块和工具详情页。

## 怎么添加一个工具

1. 复制 `content/tools/_template.md`
2. 改成新的英文文件名，例如 `cursor.md`
3. 填写顶部字段和正文
4. 提交到仓库

固定格式如下：

```md
---
id: cursor
name: Cursor
category: 开发工具
summary: 一句话说明这个工具解决什么问题。
icon: ✦
color: "#4B3FE3"
homepage: https://example.com/
order: 100
tags:
  - 标签一
  - 标签二
---

# Cursor 使用心得

正文从这里开始。
```

## 本地预览

```bash
npm install
npm run dev
```

打开终端里显示的本地地址。

## 构建

```bash
npm run build
```

构建输出在 `dist/`。

## 免费部署建议

推荐 Cloudflare Pages：

- 构建命令：`npm run build`
- 输出目录：`dist`
- Node 版本：默认即可

也可以使用 GitHub Pages。项目已经设置了相对资源路径，适合部署到仓库子路径。

## 项目结构

```text
content/tools/              Markdown 内容源
scripts/generate-content.js 读取 Markdown 并生成前端数据
src/js/generated-content.js 自动生成的数据文件
src/js/main.js              首页和详情页交互
src/css/                    设计系统和页面样式
index.html                  首页
tool-detail.html            工具详情页
writing-guide.html          写作指南
```
