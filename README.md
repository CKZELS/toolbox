# Toolbox

[English](README.en.md) | 中文

一个用 Markdown 维护的工具收藏网站模板。把固定格式的 Markdown 文件放进 `content/tools/`，构建时会自动生成首页分类模块和工具详情页。

![Toolbox 预览](https://raw.githubusercontent.com/CKZELS/toolbox/main/docs/preview.png)

## 当前架构速览

这个项目是静态网站，适合部署到 Cloudflare Pages 或 GitHub Pages。

- 公开网站只发布 `index.html` 和 `tool-detail.html`
- 维护文档放在 `docs/writing-guide.md`，不会发布到公开网站
- 工具内容只维护 `content/tools/*.md`
- 首页工具卡片会在构建时写入 `index.html`，即使 JavaScript 失效也能看到工具列表
- 搜索、分类、详情页渲染由 `toolbox.js` 增强
- `generated-content.js`、`public/generated-content.js`、`public/toolbox.js` 都由脚本生成或同步，不要手动编辑

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

构建时会先执行 `npm run generate`。它会：

1. 读取 `content/tools/*.md`
2. 更新首页里的静态工具卡片
3. 生成 `generated-content.js`
4. 生成 `public/generated-content.js`
5. 把根目录的 `toolbox.js` 同步到 `public/toolbox.js`
6. 由 Vite 输出公开网站到 `dist/`

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
scripts/generate-content.js 读取 Markdown，生成首页静态内容和前端数据
generated-content.js        根目录数据文件，兼容根目录发布
public/generated-content.js 构建时发布到 dist 的数据文件
toolbox.js                  根目录交互脚本，兼容根目录发布
public/toolbox.js           由 generate 脚本从 toolbox.js 同步而来
src/css/                    设计系统和页面样式
index.html                  首页
tool-detail.html            工具详情页
docs/writing-guide.md       维护者写作指南，不发布到公开网站
```

## 给新会话或维护者的注意事项

- 新增工具：只新增或修改 `content/tools/*.md`
- 修改交互：只改根目录 `toolbox.js`，然后运行 `npm run generate`
- 不要手动改 `public/toolbox.js`，它会被覆盖
- 不要手动改 `generated-content.js` 或 `public/generated-content.js`
- 每次提交前至少运行一次 `npm run build`
