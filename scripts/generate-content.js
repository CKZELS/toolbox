import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const contentDir = join(rootDir, 'content', 'tools')
const outputFile = join(rootDir, 'src', 'js', 'generated-content.js')
const indexFile = join(rootDir, 'index.html')

const requiredFields = ['id', 'name', 'category', 'summary', 'icon', 'color', 'homepage', 'tags']

function parseScalar(value) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }
  if (/^\d+$/.test(trimmed)) return Number(trimmed)
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map(item => parseScalar(item))
      .filter(Boolean)
  }
  return trimmed
}

function parseFrontmatter(source, fileName) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw new Error(`${fileName} 缺少 frontmatter。文件必须以 --- 开头并包含固定字段。`)
  }

  const meta = {}
  const lines = match[1].split('\n')
  let currentListKey = null

  for (const line of lines) {
    if (!line.trim()) continue

    const listItem = line.match(/^\s*-\s+(.+)$/)
    if (listItem && currentListKey) {
      meta[currentListKey].push(parseScalar(listItem[1]))
      continue
    }

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!pair) {
      throw new Error(`${fileName} frontmatter 中有无法识别的行：${line}`)
    }

    const [, key, rawValue] = pair
    if (rawValue.trim() === '') {
      meta[key] = []
      currentListKey = key
    } else {
      meta[key] = parseScalar(rawValue)
      currentListKey = null
    }
  }

  for (const field of requiredFields) {
    if (meta[field] === undefined || meta[field] === '') {
      throw new Error(`${fileName} 缺少字段：${field}`)
    }
  }

  if (!Array.isArray(meta.tags) || meta.tags.length === 0) {
    throw new Error(`${fileName} 的 tags 必须是非空列表。`)
  }

  return { meta, markdown: match[2].trim() }
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

function formatInline(value) {
  let html = escapeHtml(value)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  return html
}

function flushList(state, html) {
  if (!state.listType) return
  html.push(`</${state.listType}>`)
  state.listType = null
}

function flushParagraph(state, html) {
  if (state.paragraph.length === 0) return
  html.push(`<p>${formatInline(state.paragraph.join(' '))}</p>`)
  state.paragraph = []
}

function markdownToHtml(markdown) {
  const html = []
  const state = { paragraph: [], listType: null, inCode: false, code: [], codeLang: '' }
  const lines = markdown.split('\n')

  for (const line of lines) {
    const fence = line.match(/^```(\w+)?\s*$/)
    if (fence) {
      if (state.inCode) {
        html.push(`<pre><code>${escapeHtml(state.code.join('\n'))}</code></pre>`)
        state.inCode = false
        state.code = []
        state.codeLang = ''
      } else {
        flushParagraph(state, html)
        flushList(state, html)
        state.inCode = true
        state.codeLang = fence[1] || ''
      }
      continue
    }

    if (state.inCode) {
      state.code.push(line)
      continue
    }

    if (!line.trim()) {
      flushParagraph(state, html)
      flushList(state, html)
      continue
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      flushParagraph(state, html)
      flushList(state, html)
      const level = heading[1].length
      html.push(`<h${level}>${formatInline(heading[2])}</h${level}>`)
      continue
    }

    const quote = line.match(/^>\s+(.+)$/)
    if (quote) {
      flushParagraph(state, html)
      flushList(state, html)
      html.push(`<blockquote>${formatInline(quote[1])}</blockquote>`)
      continue
    }

    const unordered = line.match(/^[-*]\s+(.+)$/)
    const ordered = line.match(/^\d+\.\s+(.+)$/)
    if (unordered || ordered) {
      flushParagraph(state, html)
      const listType = unordered ? 'ul' : 'ol'
      if (state.listType !== listType) {
        flushList(state, html)
        html.push(`<${listType}>`)
        state.listType = listType
      }
      html.push(`<li>${formatInline((unordered || ordered)[1])}</li>`)
      continue
    }

    flushList(state, html)
    state.paragraph.push(line.trim())
  }

  flushParagraph(state, html)
  flushList(state, html)
  return html.join('\n')
}

function groupByCategory(tools) {
  return tools.reduce((groups, tool) => {
    if (!groups.has(tool.category)) groups.set(tool.category, [])
    groups.get(tool.category).push(tool)
    return groups
  }, new Map())
}

function renderStaticCategoryFilters(categories) {
  return categories.map(category => `
        <button class="category-tag${category === '全部' ? ' is-active' : ''}" type="button" data-category="${escapeAttribute(category)}">${escapeHtml(category)}</button>`).join('')
}

function renderStaticToolCard(tool, index) {
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
          </a>`
}

function renderStaticToolSections(tools) {
  return Array.from(groupByCategory(tools).entries()).map(([category, categoryTools]) => `
        <section class="category-section">
          <div class="section-header">
            <h2 class="section-title">${escapeHtml(category)}</h2>
            <span class="section-count">${categoryTools.length} 个工具</span>
          </div>
          <div class="tools-grid">
            ${categoryTools.map((tool, index) => renderStaticToolCard(tool, index)).join('')}
          </div>
        </section>`).join('')
}

function replaceGeneratedBlock(source, name, html) {
  const start = `<!-- generated:${name}:start -->`
  const end = `<!-- generated:${name}:end -->`
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`)
  if (!pattern.test(source)) {
    throw new Error(`index.html 缺少生成标记：${name}`)
  }
  return source.replace(pattern, `${start}${html}\n        ${end}`)
}

async function main() {
  const entries = await readdir(contentDir, { withFileTypes: true })
  const files = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_'))
    .map(entry => entry.name)
    .sort()

  const tools = []
  const details = {}

  for (const file of files) {
    const source = await readFile(join(contentDir, file), 'utf8')
    const { meta, markdown } = parseFrontmatter(source, file)
    const title = markdown.match(/^#\s+(.+)$/m)?.[1] || meta.name

    const tool = {
      id: meta.id,
      name: meta.name,
      icon: meta.icon,
      description: meta.summary,
      category: meta.category,
      tags: meta.tags,
      detailUrl: `tool-detail.html?id=${encodeURIComponent(meta.id)}`,
      color: meta.color,
      homepage: meta.homepage,
      order: meta.order || 999
    }

    tools.push(tool)
    details[meta.id] = {
      title,
      name: meta.name,
      category: meta.category,
      tags: meta.tags,
      description: meta.summary,
      homepage: meta.homepage,
      content: markdownToHtml(markdown.replace(/^#\s+.+\n?/, '').trim())
    }
  }

  tools.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
  const categories = ['全部', ...Array.from(new Set(tools.map(tool => tool.category)))]
  const generated = `// This file is generated by scripts/generate-content.js. Edit content/tools/*.md instead.\nexport const toolsData = ${JSON.stringify(tools, null, 2)}\n\nexport const toolDetails = ${JSON.stringify(details, null, 2)}\n\nexport const categories = ${JSON.stringify(categories, null, 2)}\n`

  await mkdir(dirname(outputFile), { recursive: true })
  await writeFile(outputFile, generated, 'utf8')

  const currentIndex = await readFile(indexFile, 'utf8')
  const nextIndex = replaceGeneratedBlock(
    replaceGeneratedBlock(currentIndex, 'category-filters', renderStaticCategoryFilters(categories)),
    'tools-sections',
    renderStaticToolSections(tools)
  )
  await writeFile(indexFile, nextIndex, 'utf8')

  console.log(`Generated ${tools.length} tools -> ${outputFile}`)
  console.log(`Updated static homepage fallback -> ${indexFile}`)
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
