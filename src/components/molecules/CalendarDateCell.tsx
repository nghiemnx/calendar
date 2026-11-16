import {
  formatLunarLong,
  formatLunarShort,
  formatSolarDate,
  formatWeekday,
  isSameSolarDate,
  type CalendarCell as CalendarCellData,
  type SolarDate,
} from '@/lib/calendar'

type CalendarDateCellProps = {
  cell: CalendarCellData
  selectedDate: SolarDate
  today: SolarDate
  onSelect: (date: SolarDate) => void
}

export default function CalendarDateCell({ cell, selectedDate, today, onSelect }: CalendarDateCellProps) {
  if (!cell.isCurrentMonth) {
    return <span className="date-cell is-outside" role="gridcell" aria-hidden="true" />
  }

  const isSelected = isSameSolarDate(cell.solar, selectedDate)
  const isToday = isSameSolarDate(cell.solar, today)
  const holidayLabel = cell.holidays.length > 0 ? `, ${cell.holidays.map((holiday) => holiday.name).join(', ')}` : ''
  const label = `${formatWeekday(cell.solar)}, ${formatSolarDate(cell.solar)}, ngày âm ${formatLunarLong(cell.lunar)}${holidayLabel}`
  const isMarked = cell.lunar.day === 1 || cell.lunar.day === 15

  return (
    <button
      className={`date-cell${isSelected ? ' is-selected' : ''}${isToday ? ' is-today' : ''}${cell.holidays.length > 0 ? ' has-holiday' : ''}`}
      type="button"
      role="gridcell"
      aria-label={label}
      aria-selected={isSelected}
      aria-current={isToday ? 'date' : undefined}
      onClick={() => onSelect(cell.solar)}
    >
      <span className="solar-day">{cell.solar.day}</span>
      <span className={`lunar-day${isMarked ? ' is-marked' : ''}`}>{formatLunarShort(cell.lunar)}</span>
      {cell.holidays.length > 0 && <span className="holiday-dot" aria-hidden="true" />}
    </button>
  )
}
