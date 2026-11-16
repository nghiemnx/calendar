import {
  formatLunarLong,
  formatSolarDate,
  isSameSolarDate,
  type CalendarCell,
  type SolarDate,
} from '@/lib/calendar'

type SelectedDateSummaryProps = {
  cell: CalendarCell | undefined
  today: SolarDate
}

export default function SelectedDateSummary({ cell, today }: SelectedDateSummaryProps) {
  if (!cell) return null

  return (
    <>
      <p className="detail-solar">{formatSolarDate(cell.solar)}</p>
      <div className="detail-divider" />
      <p className="detail-label">Âm lịch</p>
      <p className="detail-lunar">{formatLunarLong(cell.lunar)}</p>
      {isSameSolarDate(cell.solar, today) && <p className="today-note">Hôm nay theo giờ Việt Nam</p>}
    </>
  )
}
