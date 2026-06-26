# My Toolbox

个人工具箱网站，收录并展示常用的开发、设计和效率工具。

## 技术栈

- 纯 HTML / CSS / JavaScript
- 基于 CSS 自定义属性的设计系统
- Tailwind CSS (CDN) + Lucide 图标 (CDN)

## 目录结构

```
├── index.html            # 首页 - 工具列表展示
├── tool-detail.html      # 工具详情页
├── writing-guide.html    # 写作指南
├── markdown-demo.html    # Markdown 渲染示例
├── assets/               # 图标等静态资源
├── partials/             # 可复用的 HTML 片段
├── src/
│   ├── css/              # 样式文件
│   │   ├── design-system.css  # 设计系统变量
│   │   └── main.css           # 主样式
│   └── js/
│       └── main.js            # 工具数据与交互逻辑
└── .trae/                # Trae 设计导出文件
```

## 本地运行

用任意静态文件服务器即可预览，例如：

```bash
# Python 3
python3 -m http.server 8080

# Node.js (需安装 serve)
npx serve .
```

然后打开浏览器访问 `http://localhost:8080/index.html`。

## Cloudflare Pages 部署

本项目为纯静态网站，可直接部署：

1. 构建输出目录设为 `.`（根目录）
2. 无需构建命令
3. 部署后入口为 `/index.html`
