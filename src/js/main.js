const toolsData = [
  {
    id: 'vscode',
    name: 'VS Code',
    icon: '💻',
    description: '轻量但强大的代码编辑器，支持几乎所有主流编程语言',
    category: '开发工具',
    tags: ['编辑器', '开源', '跨平台'],
    detailUrl: 'tool-detail.html?id=vscode',
    color: '#007ACC'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: '🎨',
    description: '协作式界面设计工具，团队实时协作设计原型',
    category: '设计工具',
    tags: ['设计', '协作', '云端'],
    detailUrl: 'tool-detail.html?id=figma',
    color: '#F24E1E'
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: '📝',
    description: '集笔记、文档、任务管理于一体的生产力工具',
    category: '效率工具',
    tags: ['笔记', '知识库', '跨平台'],
    detailUrl: 'tool-detail.html?id=notion',
    color: '#000000'
  },
  {
    id: 'arc',
    name: 'Arc Browser',
    icon: '🌐',
    description: '重新定义浏览器体验，创新的标签页和分屏设计',
    category: '效率工具',
    tags: ['浏览器', '创新', 'Mac'],
    detailUrl: 'tool-detail.html?id=arc',
    color: '#FB74A1'
  },
  {
    id: 'raycast',
    name: 'Raycast',
    icon: '⚡',
    description: 'macOS 上的启动器和效率工具，快速执行各种操作',
    category: '效率工具',
    tags: ['启动器', 'Mac', '效率'],
    detailUrl: 'tool-detail.html?id=raycast',
    color: '#FF6363'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    description: '全球最大的代码托管平台，开源协作的中心',
    category: '开发工具',
    tags: ['代码托管', '开源', '协作'],
    detailUrl: 'tool-detail.html?id=github',
    color: '#24292e'
  },
  {
    id: 'linear',
    name: 'Linear',
    icon: '📋',
    description: '现代化的项目管理和问题追踪工具',
    category: '效率工具',
    tags: ['项目管理', '协作', 'SaaS'],
    detailUrl: 'tool-detail.html?id=linear',
    color: '#5E6AD2'
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    icon: '💎',
    description: '基于本地 Markdown 文件的知识管理工具',
    category: '效率工具',
    tags: ['笔记', '本地存储', '双向链接'],
    detailUrl: 'tool-detail.html?id=obsidian',
    color: '#7C3AED'
  },
  {
    id: 'sf-symbols',
    name: 'SF Symbols',
    icon: '🎯',
    description: 'Apple 官方图标库，数千个一致设计的矢量图标',
    category: '设计工具',
    tags: ['图标', 'Apple', '免费'],
    detailUrl: 'tool-detail.html?id=sf-symbols',
    color: '#007AFF'
  }
]

const toolDetails = {
  vscode: {
    title: 'VS Code 使用心得',
    category: '开发工具',
    tags: ['编辑器', '开源', '跨平台', 'Microsoft'],
    description: 'Visual Studio Code 是我日常开发中使用频率最高的工具。它轻量、快速，同时拥有强大的插件生态系统。',
    content: `
<h2>为什么选择 VS Code</h2>
<p>在尝试过 Sublime Text、Atom、WebStorm 等多款编辑器后，我最终选择了 VS Code 作为主力开发工具。它的优势在于：</p>
<ul>
  <li><strong>启动速度快</strong>：相比 IDE 类产品，VS Code 的启动速度几乎是即时的</li>
  <li><strong>插件生态丰富</strong>：几乎所有主流语言和框架都有对应的插件支持</li>
  <li><strong>内置 Git 集成</strong>：开箱即用的版本控制功能</li>
  <li><strong>Remote Development</strong>：远程开发体验一流</li>
</ul>

<h2>我常用的插件</h2>
<h3>代码质量</h3>
<ul>
  <li><code>ESLint</code> - JavaScript/TypeScript 代码检查</li>
  <li><code>Prettier</code> - 代码格式化</li>
  <li><code>SonarLint</code> - 代码质量分析</li>
</ul>

<h3>效率提升</h3>
<ul>
  <li><code>GitLens</code> - 增强 Git 功能</li>
  <li><code>Path Intellisense</code> - 路径自动补全</li>
  <li><code>Auto Rename Tag</code> - 自动重命名 HTML 标签</li>
</ul>

<h2>快捷键技巧</h2>
<pre><code>⌘P  # 快速打开文件
⌘⇧P  # 命令面板
⌘D  # 选中下一个相同的词
⌘⇧K  # 删除整行
⌥↓ / ⌥↑  # 向下/向上移动整行</code></pre>

<blockquote>提示：掌握快捷键是提升编码效率最有效的方式之一。</blockquote>

<h3>主题推荐</h3>
<p>我个人比较喜欢的几个主题：</p>
<ul>
  <li>One Dark Pro - 经典的暗色主题</li>
  <li>Github Theme - GitHub 风格的主题</li>
  <li>Dracula - 紫色调的暗色主题</li>
</ul>
`
  },
  figma: {
    title: 'Figma 设计指南',
    category: '设计工具',
    tags: ['设计', '协作', '云端', 'UI/UX'],
    description: 'Figma 已经成为 UI/UX 设计领域的事实标准，基于浏览器的协作特性让团队协作变得无比顺畅。',
    content: `
<h2>Figma 的核心优势</h2>
<p>Figma 最大的优势就是<strong>基于云端</strong>和<strong>实时协作</strong>。设计师和开发人员可以同时查看同一个文件，极大地提升了沟通效率。</p>

<h2>实用技巧</h2>
<ul>
  <li>使用 Components 建立设计系统</li>
  <li>Auto Layout 让响应式设计变得简单</li>
  <li>Variants 管理组件的不同状态</li>
  <li>社区资源丰富，可以找到大量免费模板</li>
</ul>

<h3>常用插件</h3>
<ul>
  <li>Iconify - 海量图标库</li>
  <li>Unsplash - 免费图片素材</li>
  <li>Blush - 插画素材</li>
</ul>
`
  },
  notion: {
    title: 'Notion 知识库搭建',
    category: '效率工具',
    tags: ['笔记', '知识库', '跨平台', '生产力'],
    description: '用 Notion 搭建个人知识库，整合笔记、任务、项目管理于一体。',
    content: `
<h2>我的 Notion 使用方式</h2>
<p>Notion 的灵活性既是优点也是缺点。经过多次迭代，我形成了自己的一套知识库结构。</p>

<h2>核心数据库</h2>
<ul>
  <li><strong>每日日志</strong> - 每天记录工作和想法</li>
  <li><strong>项目管理</strong> - 跟踪进行中的项目</li>
  <li><strong>读书笔记</strong> - 整理读书心得</li>
  <li><strong>工具收藏</strong> - 收集有用的工具和资源</li>
</ul>

<h2>模板推荐</h2>
<blockquote>Notion 社区有大量优秀的模板，不要从零开始搭建，先从模板开始再逐步调整。</blockquote>
`
  },
  arc: {
    title: 'Arc Browser 体验',
    category: '效率工具',
    tags: ['浏览器', '创新', 'Mac', '生产力'],
    description: 'Arc 重新定义了浏览器的使用方式，创新的空间概念和分屏功能让多任务处理更高效。',
    content: `
<h2>Arc 的创新之处</h2>
<p>Arc Browser 是 The Browser Company 推出的一款全新浏览器，基于 Chromium 内核，但在交互设计上做了大量创新。</p>

<h2>我最喜欢的功能</h2>
<ul>
  <li><strong>Spaces</strong> - 按场景划分浏览空间</li>
  <li><strong>Split View</strong> - 分屏浏览，无需切换标签</li>
  <li><strong>Little Arc</strong> - 快速打开的小窗口</li>
  <li><strong>Arc Boost</strong> - 自定义网站样式</li>
</ul>

<h3>使用建议</h3>
<p>Arc 适合需要同时处理多个任务的用户，但也有一定的学习成本。建议花 1-2 周时间适应它的工作方式。</p>
`
  },
  raycast: {
    title: 'Raycast 效率指南',
    category: '效率工具',
    tags: ['启动器', 'Mac', '效率', '快捷键'],
    description: 'Raycast 让你的双手不用离开键盘就能完成几乎所有操作，是 macOS 上的效率神器。',
    content: `
<h2>为什么选择 Raycast</h2>
<p>作为 Alfred 的替代品，Raycast 提供了更现代的界面和更丰富的扩展生态。而且基础版完全免费。</p>

<h2>常用功能</h2>
<ul>
  <li>应用启动 - ⌥Space 快速启动任何应用</li>
  <li>剪贴板历史 - 随时找回复制过的内容</li>
  <li>窗口管理 - 快速排列和切换窗口</li>
  <li>Snippets - 常用文本快速输入</li>
</ul>

<h3>推荐扩展</h3>
<pre><code>- GitHub: 快速访问仓库和 Issue
- Linear: 管理任务
- Notion: 搜索页面
- 翻译: 即时翻译</code></pre>
`
  },
  github: {
    title: 'GitHub 使用技巧',
    category: '开发工具',
    tags: ['代码托管', '开源', '协作', 'Git'],
    description: 'GitHub 不只是代码托管平台，更是开源协作和项目管理的核心工具。',
    content: `
<h2>GitHub 进阶技巧</h2>
<p>除了基本的代码托管，GitHub 还有很多强大功能值得探索。</p>

<h2>实用功能</h2>
<ul>
  <li><strong>GitHub Actions</strong> - CI/CD 自动化</li>
  <li><strong>Projects</strong> - 项目看板管理</li>
  <li><strong>Codespaces</strong> - 云端开发环境</li>
  <li><strong>Copilot</strong> - AI 代码助手</li>
</ul>

<h3>快捷键</h3>
<p>在 GitHub 网页上按 <code>?</code> 可以查看所有快捷键。</p>
`
  },
  linear: {
    title: 'Linear 项目管理',
    category: '效率工具',
    tags: ['项目管理', '协作', 'SaaS', '团队协作'],
    description: 'Linear 是一款现代化的 issue 追踪和项目管理工具，简洁高效。',
    content: `
<h2>Linear 的设计理念</h2>
<p>Linear 的设计哲学是<strong>简洁、快速、专注</strong>。它去掉了很多传统项目管理工具中冗余的功能。</p>

<h2>核心特性</h2>
<ul>
  <li>流畅的键盘操作</li>
  <li>自动循环周期（Cycles）</li>
  <li>GitHub/GitLab 集成</li>
  <li>强大的筛选和视图</li>
</ul>
`
  },
  obsidian: {
    title: 'Obsidian 笔记法',
    category: '效率工具',
    tags: ['笔记', '本地存储', '双向链接', '知识管理'],
    description: 'Obsidian 是一款基于本地 Markdown 文件的笔记软件，强调数据所有权和双向链接。',
    content: `
<h2>为什么选择 Obsidian</h2>
<p>Obsidian 最大的特点是<strong>本地优先</strong>。你的笔记就是普通的 Markdown 文件，永远不会被锁定在某个平台。</p>

<h2>核心概念</h2>
<ul>
  <li><strong>双向链接</strong> - 让知识形成网络</li>
  <li><strong>图谱视图</strong> - 可视化知识关联</li>
  <li><strong>插件生态</strong> - 社区插件功能强大</li>
  <li><strong>Canvas</strong> - 无限画布整理思路</li>
</ul>

<h3>插件推荐</h3>
<ul>
  <li>Dataview - 数据库式查询笔记</li>
  <li>Templater - 模板功能增强</li>
  <li>Calendar - 日历视图</li>
</ul>
`
  },
  'sf-symbols': {
    title: 'SF Symbols 使用指南',
    category: '设计工具',
    tags: ['图标', 'Apple', '免费', '设计资源'],
    description: 'SF Symbols 是 Apple 提供的官方图标库，包含数千个精心设计的矢量图标。',
    content: `
<h2>SF Symbols 简介</h2>
<p>SF Symbols 是 Apple 在 2019 年推出的图标系统，与 San Francisco 字体无缝集成。</p>

<h2>优势</h2>
<ul>
  <li>超过 5000 个图标</li>
  <li>支持多种粗细和大小</li>
  <li>与系统字体自动对齐</li>
  <li>完全免费，可用于商业项目</li>
</ul>

<h3>如何获取</h3>
<p>直接从 Apple 开发者网站下载 SF Symbols 应用，或者在网页上浏览。</p>
`
  }
}

const categories = ['全部', '开发工具', '设计工具', '效率工具']

let currentCategory = '全部'
let searchQuery = ''

document.addEventListener('DOMContentLoaded', () => {
  initNavigation()
  initSearch()
  initCategoryFilters()
  renderTools()
  initToolDetailPage()
})

function initNavigation() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn')
  const navLinks = document.querySelector('.site-nav-links')

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('is-open')
    })
  }
}

function initSearch() {
  const searchInput = document.querySelector('.search-input input')
  if (!searchInput) return

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase()
    renderTools()
  })
}

function initCategoryFilters() {
  const filterTags = document.querySelectorAll('.category-tag')
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const category = tag.dataset.category
      currentCategory = category

      filterTags.forEach(t => t.classList.remove('is-active'))
      tag.classList.add('is-active')

      renderTools()
    })
  })
}

function getFilteredTools() {
  return toolsData.filter(tool => {
    const matchCategory = currentCategory === '全部' || tool.category === currentCategory
    const matchSearch = !searchQuery ||
      tool.name.toLowerCase().includes(searchQuery) ||
      tool.description.toLowerCase().includes(searchQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    return matchCategory && matchSearch
  })
}

function renderTools() {
  const toolsGrid = document.querySelector('.tools-grid')
  if (!toolsGrid) return

  const filteredTools = getFilteredTools()

  if (filteredTools.length === 0) {
    toolsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">没有找到匹配的工具</div>
      </div>
    `
    return
  }

  toolsGrid.innerHTML = filteredTools.map((tool, index) => `
    <a href="${tool.detailUrl}" class="tool-card stagger-item" style="animation-delay: ${index * 50}ms;">
      <div class="tool-card-icon" style="background: ${tool.color}15; border-color: ${tool.color}30;">
        ${tool.icon}
      </div>
      <div class="tool-card-content">
        <div class="tool-card-title">${tool.name}</div>
        <div class="tool-card-desc">${tool.description}</div>
        <div class="tool-card-tags">
          ${tool.tags.slice(0, 3).map(tag => `<span class="tool-card-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('')
}

function initToolDetailPage() {
  const articleContent = document.querySelector('.article-content')
  if (!articleContent) return

  const params = new URLSearchParams(window.location.search)
  const toolId = params.get('id') || 'vscode'

  const detail = toolDetails[toolId]
  if (!detail) {
    articleContent.innerHTML = '<p>工具不存在</p>'
    return
  }

  const title = document.querySelector('.tool-detail-title')
  if (title) title.textContent = detail.title

  const metaTags = document.querySelector('.tool-detail-meta')
  if (metaTags) {
    metaTags.innerHTML = detail.tags.map(tag => `
      <span class="ds-tag">${tag}</span>
    `).join('')
  }

  const articleBody = document.querySelector('.article-body')
  if (articleBody) {
    articleBody.innerHTML = detail.content
  }

  const breadcrumbCurrent = document.querySelector('.ds-breadcrumb__current')
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = detail.title
  }

  const toolLink = detail.tags.includes('开源') ? 'https://github.com' : '#'
  const actionsContainer = document.querySelector('.tool-detail-actions')
  if (actionsContainer) {
    actionsContainer.innerHTML = `
      <button class="ds-btn ds-btn--primary" onclick="window.open('${toolLink}', '_blank')">
        <span data-icon style="width:16px;height:16px;-webkit-mask-image:url('assets/image_11_nj7th1.svg');mask-image:url('assets/image_11_nj7th1.svg');"></span>
        访问官网
      </button>
      <button class="ds-btn ds-btn--secondary" onclick="navigator.clipboard.writeText(window.location.href)">
        分享链接
      </button>
    `
  }

  document.title = `${detail.title} - My Toolbox`
}
