---
id: cardinal
name: Cardinal
category: 效率工具
summary: macOS 上的高速文件搜索工具，基于 Rust+Tauri，支持 Everything 语法。
icon: 🔍
color: "#DC2626"
homepage: https://github.com/cardisoft/cardinal
order: 62
tags:
  - 文件搜索
  - macOS
  - Everything
---

# Cardinal 使用心得

Cardinal 是 macOS 上对标 Windows Everything 的文件搜索工具。Rust 后端加 Tauri 前端，响应在毫秒级，千万级文件列表也能流畅渲染。

## 核心特点

- 毫秒级搜索，结果比 Spotlight 更精准
- Everything 兼容语法：空格 AND、`|` OR、`!` NOT、`ext:pdf`、`size:>100MB`
- 路径分段匹配：`/root` 前缀、`root/` 后缀、`src/**/Cargo.toml` globstar
- 全局热键 `Cmd+Shift+Space` 唤起，`Space` 快速预览
- 开源免费，`brew install --cask cardinal-search` 一键安装

## 适合什么场景

- Spotlight 结果遗漏、找不到文件的时候
- 怀念 Windows Everything 的搜索体验
- 需要按扩展名、大小、路径、Finder 标签精确过滤文件
- 穿梭在大量代码仓库和系统目录之间

## 使用建议

如果常用 Everything 语法，上手很快。不熟悉的话，从最简单的关键词搜起，再逐步加 `ext:`、`size:` 这些过滤条件。它主打文件名和路径搜索，不是全文检索工具。
