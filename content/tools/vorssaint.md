---
id: vorssaint
name: Vorssaint
category: 效率工具
summary: 把音量控制、系统监控、窗口管理、剪贴板与清理工具集中到一个 macOS 菜单栏应用中。
icon: ⚙️
color: "#4C8DFF"
homepage: https://github.com/vorssaint/vorssaint-utils
order: 20
tags:
  - macOS
  - 开源
  - 菜单栏工具
---

# Vorssaint 使用心得

Vorssaint 是一款免费、开源的 macOS 菜单栏工具，将许多原本需要单独安装的系统增强功能整合在一个入口中。它没有账号、订阅和遥测，主要功能都在本地运行。

## 为什么推荐

- 功能覆盖全面：包含分应用音量、音频输出切换、系统监控、窗口布局、Dock 预览、剪贴板历史、文本片段、文件暂存架、应用卸载和媒体压缩等工具。
- 支持按需安装功能：不用的模块可以卸载并停止加载，减少不必要的 CPU、内存和能耗占用。
- 注重隐私：没有后端、账号或分析追踪，权限用途和依赖功能都有清晰说明。
- 配置灵活：菜单栏面板支持排序和隐藏，也能导出设置并在新 Mac 上导入。

## 适合什么场景

如果你经常同时使用多个 macOS 系统增强工具，希望减少菜单栏图标、订阅费用和配置成本，Vorssaint 值得尝试。它尤其适合需要分应用音量、窗口管理、系统状态监控或本地剪贴板历史的用户。

## 使用建议

Vorssaint 目前要求 Apple Silicon Mac 和 macOS 14 Sonoma 或更新版本。建议先安装 Essentials 等预设组合，再根据实际需求开启其他功能，并只授予对应功能确实需要的系统权限。

可以通过 Homebrew 安装：

```sh
brew install --cask vorssaint/tap/vorssaint
```
