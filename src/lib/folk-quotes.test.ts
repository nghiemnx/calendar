import { describe, expect, it } from 'vitest'
import { getFolkQuoteForDate, parseFolkQuotes } from './folk-quotes'

describe('folk quote data', () => {
  it('normalizes the supplied content and author fields', () => {
    expect(parseFolkQuotes([
      { content: '  Có công mài sắt, có ngày nên kim  ', 'tác giả': ' sưu tầm ' },
      { text: 'Một câu khác', author: 'Tác giả khác' },
      { content: '   ' },
    ])).toEqual([
      { content: 'Có công mài sắt, có ngày nên kim', author: 'sưu tầm' },
      { content: 'Một câu khác', author: 'Tác giả khác' },
    ])
  })

  it('selects the same quote for the same date', () => {
    const quotes = parseFolkQuotes([{ content: 'Câu một' }, { content: 'Câu hai' }])
    const date = { year: 2026, month: 11, day: 16 }

    expect(getFolkQuoteForDate(quotes, date)).toEqual(getFolkQuoteForDate(quotes, date))
    expect(getFolkQuoteForDate([], date)).toBeNull()
  })
})
