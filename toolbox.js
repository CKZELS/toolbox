const { categories = [], toolDetails = {}, toolsData = [] } = window.toolboxContent || {}

let currentCategory = '全部'
let searchQuery = ''
let heroTitleTapCount = 0
let heroTitleTapTimer = null

const easterEggModes = {
  mambo: {
    kicker: 'Manbo mode',
    title: '曼波校准台已启动',
    text: '工具列表暂时进入哈基米节奏。该干活干活，该曼波曼波。',
    tags: ['搜索「曼波」触发', 'mambo verified', '节奏通过']
  },
  guard: {
    kicker: 'Man! What can I say?',
    title: 'Mamba out.',
    text: '孩子们，事已至此，选一款饮料吧。搜索触发，儿童免肘。',
    tags: ['搜索「牢大」触发', '曼巴退场', '冰红茶已就位']
  },
  secret: {
    kicker: 'Title tap combo',
    title: '隐藏音轨解锁',
    text: '你连续点开了一个没人写进导航的入口。Toolbox 现在短暂进入后台调音时间。',
    tags: ['连点标题触发', 'hidden module', '已解锁']
  }
}

const sectionRevealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          sectionRevealObserver.unobserve(entry.target)
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 })
  : null

document.addEventListener('DOMContentLoaded', () => {
  initNavigation()
  initLivingBackground()
  initSearch()
  initSearchShortcut()
  initEasterEggs()
  renderCategoryFilters()
  renderTools()
  initToolDetailPage()
  initScrollProgress()
  initHeaderScrollState()
  initCardSpotlight()
  initCategoryScrollFade()
  initBackToTop()
  applySectionReveal(document)
})

function initNavigation() {
  const pageKey = document.body.dataset.page
  document.querySelectorAll('[data-nav-key]').forEach(link => {
    if (link.dataset.navKey === pageKey) {
      link.classList.add('is-active')
    }
  })
}

function initSearch() {
  const searchInput = document.querySelector('[data-tool-search]')
  const clearButton = document.querySelector('[data-search-clear]')
  if (!searchInput) return

  const updateClearVisibility = () => {
    const hasValue = searchInput.value.trim() !== ''
    if (clearButton) {
      clearButton.style.display = hasValue ? '' : 'none'
      if (hasValue) clearButton.removeAttribute('hidden')
      else clearButton.setAttribute('hidden', '')
    }
  }

  searchInput.addEventListener('input', event => {
    searchQuery = event.target.value.trim().toLowerCase()
    updateClearVisibility()
    renderTools()
    syncEasterEggFromSearch(searchQuery)
  })

  clearButton?.addEventListener('click', () => {
    searchInput.value = ''
    searchQuery = ''
    updateClearVisibility()
    renderTools()
    hideEasterEgg()
    searchInput.focus()
  })
}

function initEasterEggs() {
  const heroTitle = document.querySelector('.hero-title')
  const closeButton = document.querySelector('[data-easter-close]')

  heroTitle?.addEventListener('click', () => {
    heroTitleTapCount += 1
    window.clearTimeout(heroTitleTapTimer)
    heroTitleTapTimer = window.setTimeout(() => {
      heroTitleTapCount = 0
    }, 1200)

    if (heroTitleTapCount >= 5) {
      heroTitleTapCount = 0
      showEasterEgg('secret')
    }
  })

  closeButton?.addEventListener('click', () => {
    hideEasterEgg()
  })
}

function syncEasterEggFromSearch(query) {
  const normalizedQuery = query.replace(/\s+/g, '')
  if (!normalizedQuery) {
    hideEasterEgg()
    return
  }

  if (hasAny(normalizedQuery, ['曼波', 'mambo', 'manbo', '哈基米', 'hakimi'])) {
    showEasterEgg('mambo')
    return
  }

  if (hasAny(normalizedQuery, ['牢大', 'laoda'])) {
    showEasterEgg('guard')
    return
  }

  hideEasterEgg()
}

function hasAny(value, keywords) {
  return keywords.some(keyword => value.includes(keyword))
}

function showEasterEgg(mode) {
  const panel = document.querySelector('[data-easter-egg]')
  const content = easterEggModes[mode]
  if (!panel || !content) return

  setText('[data-egg-kicker]', content.kicker)
  setText('[data-egg-title]', content.title)
  setText('[data-egg-text]', content.text)

  const tags = panel.querySelector('[data-egg-tags]')
  if (tags) {
    tags.innerHTML = content.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')
  }

  panel.dataset.eggMode = mode
  panel.hidden = false
  clearEggMode()
  document.body.classList.add('egg-on', `egg-${mode}`)
}

function hideEasterEgg() {
  const panel = document.querySelector('[data-easter-egg]')
  if (panel) {
    panel.hidden = true
    delete panel.dataset.eggMode
  }
  clearEggMode()
}

function clearEggMode() {
  document.body.classList.remove('egg-on', 'egg-mambo', 'egg-guard', 'egg-secret')
}

function initLivingBackground() {
  const root = document.documentElement
  const sync = () => {
    root.classList.toggle('is-bg-paused', document.hidden)
  }
  document.addEventListener('visibilitychange', sync)
  sync()
}

function renderCategoryFilters() {
  const filters = document.querySelector('[data-category-filters]')
  if (!filters || categories.length === 0) return

  filters.innerHTML = categories.map(category => `
    <button class="category-tag${category === currentCategory ? ' is-active' : ''}" type="button" data-category="${escapeAttribute(category)}" aria-pressed="${category === currentCategory}">
      ${escapeHtml(category)}
    </button>
  `).join('')

  filters.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('click', () => {
      currentCategory = button.dataset.category
      updateCategoryFilterState(filters)
      renderTools()
    })
  })
}

function updateCategoryFilterState(filters) {
  filters.querySelectorAll('[data-category]').forEach(button => {
    const isActive = button.dataset.category === currentCategory
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
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
  if (!sectionsContainer || toolsData.length === 0) return

  const filteredTools = getFilteredTools()
  if (filteredTools.length === 0) {
    updateResultStatus('没有找到匹配的工具')
    sectionsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⌕</div>
        <div class="empty-state-text">没有找到匹配的工具</div>
      </div>
    `
    return
  }

  updateResultStatus(`已显示 ${filteredTools.length} 个工具`)
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
  applySectionReveal(sectionsContainer)
}

function renderToolCard(tool, index) {
  const maxTags = 3
  const visibleTags = tool.tags.slice(0, maxTags)
  const remaining = tool.tags.length - maxTags

  return `
    <a href="${escapeAttribute(tool.detailUrl)}" class="tool-card stagger-item" style="animation-delay: ${index * 40}ms;">
      <div class="tool-card-icon" style="background: ${escapeAttribute(tool.color)}15; border-color: ${escapeAttribute(tool.color)}30; color: ${escapeAttribute(tool.color)};">
        ${escapeHtml(tool.icon)}
      </div>
      <div class="tool-card-content">
        <div class="tool-card-title">${escapeHtml(tool.name)}</div>
        <div class="tool-card-desc">${escapeHtml(tool.description)}</div>
        <div class="tool-card-tags">
          ${visibleTags.map(tag => `<span class="tool-card-tag">${escapeHtml(tag)}</span>`).join('')}
          ${remaining > 0 ? `<span class="tool-card-tag is-more">+${remaining}</span>` : ''}
        </div>
      </div>
    </a>
  `
}

function updateResultStatus(message) {
  const status = document.querySelector('[data-tools-result-status]')
  if (status) status.textContent = message
}

function applySectionReveal(container) {
  const sections = container.querySelectorAll('.category-section')
  if (sections.length === 0) return
  if (!sectionRevealObserver) {
    sections.forEach(section => section.classList.add('is-visible'))
    return
  }
  sections.forEach(section => {
    if (section.classList.contains('is-visible')) return
    const rect = section.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0
    if (inView) {
      section.classList.add('is-visible')
    } else {
      sectionRevealObserver.observe(section)
    }
  })
}

function initSearchShortcut() {
  const input = document.querySelector('[data-tool-search]')
  if (!input) return

  document.addEventListener('keydown', event => {
    const active = document.activeElement
    const isTyping = !!active && (
      /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) || active.isContentEditable
    )
    const isSlash = event.key === '/' && !isTyping
    const isPalette = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
    if (isSlash || isPalette) {
      event.preventDefault()
      input.focus()
      input.select()
    }
  })
}

function initScrollProgress() {
  const bar = document.createElement('div')
  bar.className = 'scroll-progress'
  bar.setAttribute('aria-hidden', 'true')
  document.body.prepend(bar)

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
    bar.style.setProperty('--p', progress.toFixed(4))
    bar.classList.toggle('is-visible', window.scrollY > 4)
  }

  update()
  document.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
}

function initHeaderScrollState() {
  const header = document.querySelector('.site-header')
  if (!header) return

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8)
  }

  update()
  document.addEventListener('scroll', update, { passive: true })
}

function initCardSpotlight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

  document.addEventListener('pointermove', event => {
    const card = event.target.closest?.('.tool-card')
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    card.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, { passive: true })
}

function initCategoryScrollFade() {
  const scroll = document.querySelector('[data-category-filters-scroll]')
  if (!scroll) return

  const update = () => {
    const canScroll = scroll.scrollWidth > scroll.clientWidth
    scroll.classList.toggle('is-overflowing', canScroll)
    if (!canScroll) return
    scroll.classList.toggle('is-scrolled-start', scroll.scrollLeft <= 1)
    scroll.classList.toggle('is-scrolled-end', scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 1)
  }

  update()
  scroll.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
}

function initBackToTop() {
  const button = document.createElement('button')
  button.className = 'back-to-top'
  button.setAttribute('aria-label', '回到顶部')
  button.innerHTML = '↑'
  document.body.appendChild(button)

  const update = () => {
    button.classList.toggle('is-visible', window.scrollY > window.innerHeight)
  }

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  update()
  document.addEventListener('scroll', update, { passive: true })
}

function initToolDetailPage() {
  /* Always hide skeleton immediately — before any logic or early-return */
  const skeleton = document.querySelector('[data-detail-skeleton]')
  if (skeleton) skeleton.style.display = 'none'

  const articleContent = document.querySelector('[data-tool-detail]')
  if (!articleContent) return

  const params = new URLSearchParams(window.location.search)
  const requestedId = params.get('id') || toolsData[0]?.id
  const detail = toolDetails[requestedId]

  if (!detail) {
    articleContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">!</div>
        <div class="empty-state-text">工具不存在。</div>
      </div>
    `
    document.title = '工具不存在 - Toolbox'
    return
  }

  /* Reveal real content */
  const container = document.querySelector('[data-tool-detail-content]')
  container?.querySelectorAll('[hidden]').forEach(el => el.removeAttribute('hidden'))

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

  document.title = `${detail.title} - Toolbox`
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
