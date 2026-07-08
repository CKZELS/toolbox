import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const contentDir = join(rootDir, 'content', 'tools')
const outputFile = join(rootDir, 'src', 'js', 'generated-content.js')

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
  console.log(`Generated ${tools.length} tools -> ${outputFile}`)
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
