import CalendarDateCell from '@/components/molecules/CalendarDateCell'
import { type CalendarCell, type SolarDate } from '@/lib/calendar'

type CalendarGridProps = {
  label: string
  cells: CalendarCell[]
  selectedDate: SolarDate
  today: SolarDate
  onSelectDate: (date: SolarDate) => void
}

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

export default function CalendarGrid({ label, cells, selectedDate, today, onSelectDate }: CalendarGridProps) {
  return (
    <>
      <div className="weekday-row" aria-hidden="true">
        {WEEKDAYS.map((weekday) => <span key={weekday}>{weekday}</span>)}
      </div>
      <div className="date-grid" role="grid" aria-label={label}>
        {cells.map((cell) => (
          <CalendarDateCell
            key={`${cell.solar.year}-${cell.solar.month}-${cell.solar.day}`}
            cell={cell}
            selectedDate={selectedDate}
            today={today}
            onSelect={onSelectDate}
          />
        ))}
      </div>
    </>
  )
}
