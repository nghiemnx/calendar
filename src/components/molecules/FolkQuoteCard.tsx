import type { FolkQuote } from '@/lib/folk-quotes'

export default function FolkQuoteCard({ quote }: { quote: FolkQuote }) {
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
