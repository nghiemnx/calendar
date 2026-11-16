'use client'

import { useEffect, useState } from 'react'
import { getFolkQuoteForDate, parseFolkQuotes, type FolkQuote } from '@/lib/folk-quotes'
import type { SolarDate } from '@/lib/calendar'

type FolkQuoteCardProps = {
  date: SolarDate
}

export default function FolkQuoteCard({ date }: FolkQuoteCardProps) {
  const [quote, setQuote] = useState<FolkQuote | null>(null)
  const { day, month, year } = date

  useEffect(() => {
    let active = true

    fetch('./data/cau_dao.json', { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Không thể tải dữ liệu ca dao')
        return response.json() as Promise<unknown>
      })
      .then((data) => {
        if (!active) return
        setQuote(getFolkQuoteForDate(parseFolkQuotes(data), { day, month, year }))
      })
      .catch(() => {
        if (active) setQuote(null)
      })

    return () => {
      active = false
    }
  }, [day, month, year])

  if (!quote) return null

  return (
    <aside className="folk-quote" aria-label="Ca dao, tục ngữ trong ngày">
      <blockquote>
        <span className="folk-quote-mark" aria-hidden="true">“</span>
        <span>{quote.content}</span>
        <span className="folk-quote-mark folk-quote-mark-close" aria-hidden="true">”</span>
      </blockquote>
      {quote.author && <cite>— {quote.author}</cite>}
    </aside>
  )
}
