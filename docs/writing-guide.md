# 写作指南

这个文档只给维护者使用，不会发布到公开网站。

## 添加新工具

1. 复制 `content/tools/_template.md`
2. 改成新的英文文件名，例如 `cursor.md`
3. 填写顶部字段和正文
4. 提交到 GitHub

Cloudflare Pages 会自动执行 `npm run build`，并发布新的首页模块和详情页。

## 固定格式

```md
---
id: example-tool
name: Example Tool
category: 效率工具
summary: 一句话说明这个工具解决什么问题。
icon: ✦
color: "#4B3FE3"
homepage: https://example.com/
order: 100
tags:
  - 标签一
  - 标签二
---

# Example Tool 使用心得

这里开始写正文。可以使用二级标题、列表、引用和代码块。
```

## 字段说明

- `id`：唯一标识，只用英文、数字和短横线
- `name`：工具名称
- `category`：首页分类名称
- `summary`：首页卡片摘要
- `icon`：一个简短符号或 emoji
- `color`：卡片强调色
- `homepage`：官网链接
- `order`：排序数字，越小越靠前
- `tags`：标签列表

## 支持的正文格式

````md
## 二级标题

普通段落。

- 列表一
- 列表二

`行内代码`

> 引用内容

```js
console.log('代码块')
```
````

## 部署设置

Cloudflare Pages:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: 留空

公开网站只构建 `index.html` 和 `tool-detail.html`。这份指南保留在仓库里，不会进入 Cloudflare Pages 的发布目录。
