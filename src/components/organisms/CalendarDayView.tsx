import { useEffect, useRef, useState } from 'react'
import IconButton from '@/components/atoms/IconButton'
import TextButton from '@/components/atoms/TextButton'
import FolkQuoteCard from '@/components/molecules/FolkQuoteCard'
import { formatLunarLong, formatSolarDate, formatWeekday, type LunarDate, type SolarDate, type VietnameseHoliday } from '@/lib/calendar'
import { getFolkQuoteForDate, parseFolkQuotes, type FolkQuote } from '@/lib/folk-quotes'

type DaySheet = {
  date: SolarDate
  lunar: LunarDate
  holidays: VietnameseHoliday[]
}

type CalendarDayViewProps = DaySheet & {
  canGoPrevious: boolean
  canGoNext: boolean
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

type PageTurn = { direction: 'previous' | 'next'; outgoing: DaySheet }

function DaySheetContent({ date, lunar, holidays, quote }: DaySheet & { quote: FolkQuote | null }) {
  return (
    <div className={`tear-calendar-sheet${holidays.length ? ' is-holiday' : ''}`}>
      <div className="sheet-topline">
        <span>Dương lịch</span>
        <span>{formatWeekday(date).toUpperCase()}</span>
      </div>
      <div className="sheet-date-row">
        <div className="sheet-date">
          <span className="sheet-date-number">{date.day}</span>
          {quote && <FolkQuoteCard quote={quote} />}
        </div>
        <div className="sheet-lunar">
          <span className="sheet-lunar-label">Âm lịch</span>
          <span className="sheet-lunar-number" aria-hidden="true">{lunar.day}</span>
          <strong>{formatLunarLong(lunar)}</strong>
        </div>
      </div>
      {holidays.length > 0 && (
        <div className="sheet-holidays" aria-live="polite">
          <div className="sheet-section-heading">
            <span>Ngày lễ & dịp đặc biệt</span>
          </div>
          <ul>
            {holidays.map((holiday) => (
              <li key={holiday.name}>
                <span className="holiday-dot" aria-hidden="true" />
                <span>{holiday.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function CalendarDayView({ date, lunar, holidays, canGoPrevious, canGoNext, onPrevious, onNext, onToday }: CalendarDayViewProps) {
  const [turn, setTurn] = useState<PageTurn | null>(null)
  const activeTurn = useRef<PageTurn | null>(null)
  const [quotes, setQuotes] = useState<FolkQuote[]>([])
  const currentSheet = { date, lunar, holidays }
  const visibleSheets = turn ? [turn.outgoing, currentSheet] : [currentSheet]

  useEffect(() => {
    const controller = new AbortController()

    async function loadQuotes() {
      try {
        const response = await fetch('./data/cau_dao.json', { cache: 'no-cache', signal: controller.signal })
        if (!response.ok) return
        const data: unknown = await response.json()
        if (!controller.signal.aborted) setQuotes(parseFolkQuotes(data))
      } catch {
        // The calendar remains usable if the quote data is unavailable.
      }
    }

    void loadQuotes()
    return () => controller.abort()
  }, [])

  function navigate(direction: PageTurn['direction'], callback: () => void) {
    if (activeTurn.current) return

    const canAnimate = typeof window.CSS?.registerProperty === 'function'
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (canAnimate) {
      const nextTurn = { direction, outgoing: currentSheet }
      activeTurn.current = nextTurn
      setTurn(nextTurn)
    }
    callback()
  }

  function clearTurn() {
    activeTurn.current = null
    setTurn(null)
  }

  return (
    <div className={`day-view${holidays.length ? ' is-holiday' : ''}`} aria-label={`Xem ngày ${formatSolarDate(date)}`}>
      <div className="tear-calendar" role="group" aria-label="Tờ lịch trong ngày">
        <div className="tear-calendar-cover">
          <p className="cover-eyebrow">Tháng {date.month}</p>
          <strong>{date.year}</strong>
        </div>

        <div className="tear-calendar-pages">
          {visibleSheets.map((sheet) => {
            const outgoing = sheet !== currentSheet
            const direction = turn && outgoing === (turn.direction === 'next') ? turn.direction : undefined

            return (
              <div
                key={formatSolarDate(sheet.date)}
                className="tear-calendar-page"
                data-turn={direction}
                aria-hidden={outgoing || undefined}
                onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget && event.animationName === 'calendar-page-turn'
                    && direction && activeTurn.current === turn) clearTurn()
                }}
              >
                <DaySheetContent {...sheet} quote={getFolkQuoteForDate(quotes, sheet.date)} />
                {direction && (
                  <div className="tear-calendar-fold" aria-hidden="true">
                    <div className="tear-calendar-paper-back" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="day-navigation" aria-label="Điều hướng ngày">
        <IconButton label="Ngày trước" onClick={() => navigate('previous', onPrevious)} disabled={!canGoPrevious}>←</IconButton>
        <TextButton tone="today" onClick={() => { clearTurn(); onToday() }}>Hôm nay</TextButton>
        <IconButton label="Ngày sau" onClick={() => navigate('next', onNext)} disabled={!canGoNext}>→</IconButton>
      </div>
    </div>
  )
}
