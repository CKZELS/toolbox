---
id: kelivo
name: Kelivo
category: AI 工具
summary: 基于 Flutter 的跨平台 AI 聊天客户端，覆盖移动端和桌面端。
icon: 💬
color: "#0EA5E9"
homepage: https://kelivo.psycheas.top/
order: 48
tags:
  - AI 客户端
  - 跨平台
  - Flutter
---

# Kelivo 使用心得

Kelivo 用 Flutter 开发，一套代码跑遍 Android、iOS、HarmonyOS、Windows、macOS 和 Linux。界面设计受 RikkaHub 启发，主打多平台、多供应商和本地优先。

## 核心特点

- 全平台：移动端（Android/iOS/鸿蒙）+ 桌面端（Windows/macOS/Linux）
- 多供应商：OpenAI、Gemini、Anthropic 等主流模型，自配 API Key
- MCP 支持：工具集成 + 内置 fetch 工具
- 联网搜索：Bing、Exa、Tavily、Brave、Metaso、SearXNG 等十多种
- 多模态输入：图片、PDF、Word 文档
- 语音 TTS：系统 TTS + OpenAI / Gemini / ElevenLabs
- 数据备份：支持聊天记录备份恢复，可接 WebDAV / S3
- 自定义字体、二维码分享供应商配置

## 适合什么场景

- 需要在手机和电脑上用同一个 AI 客户端
- 想要鸿蒙端也能用的 AI 聊天工具
- 需要联网搜索和 MCP 工具调用
- 重视数据可控，想自己备份聊天记录

## 注意点

同样需要自备 API Key。多端同步靠手动备份恢复，不是自动云同步。内置本地 Bing 搜索质量一般，建议配置 Exa 或 Tavily 等 API 提升搜索效果。
