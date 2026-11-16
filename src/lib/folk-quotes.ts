import type { SolarDate } from '@/lib/calendar'

export type FolkQuote = {
  content: string
  author?: string
}

function asText(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const text = value.trim()
  return text || undefined
}

export function parseFolkQuotes(input: unknown): FolkQuote[] {
  if (!Array.isArray(input)) return []

  return input.flatMap((item) => {
    if (typeof item === 'string') {
      const content = asText(item)
      return content ? [{ content }] : []
    }

    if (!item || typeof item !== 'object') return []

    const record = item as Record<string, unknown>
    const content = asText(record.content) ?? asText(record.text) ?? asText(record.quote)
    if (!content) return []

    const author = asText(record['tác giả']) ?? asText(record.author)
    return [{ content, ...(author ? { author } : {}) }]
  })
}

export function getFolkQuoteForDate(quotes: FolkQuote[], date: SolarDate): FolkQuote | null {
  if (quotes.length === 0) return null

  const dateKey = date.year * 10000 + date.month * 100 + date.day
  return quotes[dateKey % quotes.length] ?? null
}
