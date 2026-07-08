import { categories, toolDetails, toolsData } from './generated-content.js'

let currentCategory = '全部'
let searchQuery = ''

document.addEventListener('DOMContentLoaded', () => {
  initNavigation()
  initSearch()
  renderCategoryFilters()
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

  const pageKey = document.body.dataset.page
  document.querySelectorAll('[data-nav-key]').forEach(link => {
    if (link.dataset.navKey === pageKey) {
      link.classList.add('is-active')
    }
  })
}

function initSearch() {
  const searchInput = document.querySelector('[data-tool-search]')
  if (!searchInput) return

  searchInput.addEventListener('input', event => {
    searchQuery = event.target.value.trim().toLowerCase()
    renderTools()
  })
}

function renderCategoryFilters() {
  const filters = document.querySelector('[data-category-filters]')
  if (!filters) return

  filters.innerHTML = categories.map(category => `
    <button class="category-tag${category === currentCategory ? ' is-active' : ''}" type="button" data-category="${escapeAttribute(category)}">
      ${escapeHtml(category)}
    </button>
  `).join('')

  filters.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('click', () => {
      currentCategory = button.dataset.category
      renderCategoryFilters()
      renderTools()
    })
  })
}

function getFilteredTools() {
  return toolsData.filter(tool => {
    const matchCategory = currentCategory === '全部' || tool.category === currentCategory
    const searchableText = [
      tool.name,
      tool.description,
      tool.category,
      ...tool.tags
    ].join(' ').toLowerCase()

    return matchCategory && (!searchQuery || searchableText.includes(searchQuery))
  })
}

function groupByCategory(tools) {
  return tools.reduce((groups, tool) => {
    if (!groups.has(tool.category)) groups.set(tool.category, [])
    groups.get(tool.category).push(tool)
    return groups
  }, new Map())
}

function renderTools() {
  const sectionsContainer = document.querySelector('[data-tools-sections]')
  if (!sectionsContainer) return

  const filteredTools = getFilteredTools()
  if (filteredTools.length === 0) {
    sectionsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⌕</div>
        <div class="empty-state-text">没有找到匹配的工具</div>
      </div>
    `
    return
  }

  const groups = groupByCategory(filteredTools)
  sectionsContainer.innerHTML = Array.from(groups.entries()).map(([category, tools]) => `
    <section class="category-section">
      <div class="section-header">
        <h2 class="section-title">${escapeHtml(category)}</h2>
        <span class="section-count">${tools.length} 个工具</span>
      </div>
      <div class="tools-grid">
        ${tools.map((tool, index) => renderToolCard(tool, index)).join('')}
      </div>
    </section>
  `).join('')
}

function renderToolCard(tool, index) {
  return `
    <a href="${escapeAttribute(tool.detailUrl)}" class="tool-card stagger-item" style="animation-delay: ${index * 40}ms;">
      <div class="tool-card-icon" style="background: ${escapeAttribute(tool.color)}15; border-color: ${escapeAttribute(tool.color)}30; color: ${escapeAttribute(tool.color)};">
        ${escapeHtml(tool.icon)}
      </div>
      <div class="tool-card-content">
        <div class="tool-card-title">${escapeHtml(tool.name)}</div>
        <div class="tool-card-desc">${escapeHtml(tool.description)}</div>
        <div class="tool-card-tags">
          ${tool.tags.slice(0, 3).map(tag => `<span class="tool-card-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>
    </a>
  `
}

function initToolDetailPage() {
  const articleContent = document.querySelector('[data-tool-detail]')
  if (!articleContent) return

  const params = new URLSearchParams(window.location.search)
  const requestedId = params.get('id') || toolsData[0]?.id
  const detail = toolDetails[requestedId]

  if (!detail) {
    articleContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">!</div>
        <div class="empty-state-text">工具不存在，可能是 Markdown 文件里的 id 写错了。</div>
      </div>
    `
    document.title = '工具不存在 - My Toolbox'
    return
  }

  setText('.tool-detail-title', detail.title)
  setText('.tool-detail-description', detail.description)
  setText('.ds-breadcrumb__current', detail.name)
  setText('[data-tool-category]', detail.category)

  const metaTags = document.querySelector('.tool-detail-meta')
  if (metaTags) {
    metaTags.innerHTML = detail.tags.map(tag => `<span class="ds-tag">${escapeHtml(tag)}</span>`).join('')
  }

  const articleBody = document.querySelector('.article-body')
  if (articleBody) {
    articleBody.innerHTML = detail.content
  }

  const homepageLink = document.querySelector('[data-tool-homepage]')
  if (homepageLink) {
    homepageLink.href = detail.homepage
    homepageLink.textContent = readableUrl(detail.homepage)
  }

  const actionsContainer = document.querySelector('.tool-detail-actions')
  if (actionsContainer) {
    actionsContainer.innerHTML = `
      <a class="ds-btn ds-btn--primary ds-btn--lg" href="${escapeAttribute(detail.homepage)}" target="_blank" rel="noopener noreferrer">访问官网</a>
      <button class="ds-btn ds-btn--secondary ds-btn--lg" type="button" data-copy-link>复制链接</button>
    `
    actionsContainer.querySelector('[data-copy-link]')?.addEventListener('click', async event => {
      await navigator.clipboard.writeText(window.location.href)
      event.currentTarget.textContent = '已复制'
      window.setTimeout(() => {
        event.currentTarget.textContent = '复制链接'
      }, 1600)
    })
  }

  document.title = `${detail.title} - My Toolbox`
}

function setText(selector, value) {
  const element = document.querySelector(selector)
  if (element) element.textContent = value
}

function readableUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('`', '&#96;')
}
