import IconButton from '@/components/atoms/IconButton'
import TextButton from '@/components/atoms/TextButton'
import FolkQuoteCard from '@/components/molecules/FolkQuoteCard'
import { formatLunarLong, formatSolarDate, formatWeekday, type LunarDate, type SolarDate, type VietnameseHoliday } from '@/lib/calendar'

type CalendarDayViewProps = {
  date: SolarDate
  lunar: LunarDate
  holidays: VietnameseHoliday[]
  canGoPrevious: boolean
  canGoNext: boolean
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export default function CalendarDayView({ date, lunar, holidays, canGoPrevious, canGoNext, onPrevious, onNext, onToday }: CalendarDayViewProps) {
  const hasHoliday = holidays.length > 0

  return (
    <div className={`day-view${hasHoliday ? ' is-holiday' : ''}`} aria-label={`Xem ngày ${formatSolarDate(date)}`}>
      <div className="tear-calendar" role="group" aria-label="Tờ lịch trong ngày">
        <div className="tear-calendar-cover">
          <p className="cover-eyebrow">Tháng {date.month}</p>
          <strong>{date.year}</strong>
        </div>

        <div className="tear-calendar-sheet">
          <div className="sheet-topline">
            <span>Dương lịch</span>
            <span>{formatWeekday(date).toUpperCase()}</span>
          </div>
          <div className="sheet-date-row">
            <div className="sheet-date">
              <span className="sheet-date-number">{date.day}</span>
              <FolkQuoteCard date={date} />
            </div>
            <div className="sheet-lunar">
              <span className="sheet-lunar-label">Âm lịch</span>
              <span className="sheet-lunar-number" aria-hidden="true">{lunar.day}</span>
              <strong>{formatLunarLong(lunar)}</strong>
            </div>
          </div>
          {hasHoliday && (
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
      </div>

      <div className="day-navigation" aria-label="Điều hướng ngày">
        <IconButton label="Ngày trước" onClick={onPrevious} disabled={!canGoPrevious}>←</IconButton>
        <TextButton tone="today" onClick={onToday}>Hôm nay</TextButton>
        <IconButton label="Ngày sau" onClick={onNext} disabled={!canGoNext}>→</IconButton>
      </div>
    </div>
  )
}
