---
id: rikkahub
name: RikkaHub
category: AI 工具
summary: 安卓原生 AI 聊天客户端，支持多家模型供应商，Material You 设计。
icon: 🤖
color: "#6750A4"
homepage: https://rikka-ai.com/
order: 47
tags:
  - AI 客户端
  - Android
  - 多模型
---

# RikkaHub 使用心得

RikkaHub 是用 Kotlin + Jetpack Compose 写的安卓原生 LLM 聊天客户端，界面遵循 Material You，支持动态主题色和深色模式。可以接入 OpenAI、Google、Anthropic 及所有兼容 API，自由切换模型。

## 核心特点

- 多供应商：自定义 API / URL / 模型，支持 OpenAI、Gemini、Anthropic
- 多模态输入：图片、文档、PDF、Docx
- MCP 支持：集成 Model Context Protocol 工具调用
- 搜索增强：Exa、Tavily、Brave、Perplexity 等多种搜索引擎
- 消息分支：随时创建对话分支，探索不同回复方向
- 智能记忆：类 ChatGPT 记忆功能，记住你的偏好
- Markdown 渲染：代码高亮、LaTeX 公式、表格、Mermaid 流程图
- Web 界面：不止手机端，浏览器也能用

## 适合什么场景

- 安卓用户想要一个原生体验的 AI 聊天客户端
- 需要在多个模型供应商之间自由切换
- 想要 MCP 工具调用和联网搜索能力
- 重视本地隐私，API Key 只存在设备上

## 注意点

需要自备 API Key。它不是厂商官方客户端，默认不内置系统提示词，回答风格和官方 App 会有差异，可以在助手设置里自行调整。
