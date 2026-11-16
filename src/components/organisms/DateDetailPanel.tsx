import InfoMark from '@/components/atoms/InfoMark'
import SelectedDateSummary from '@/components/molecules/SelectedDateSummary'
import { formatWeekday, type CalendarCell, type SolarDate } from '@/lib/calendar'

type DateDetailPanelProps = {
  cell: CalendarCell | undefined
  today: SolarDate
}

export default function DateDetailPanel({ cell, today }: DateDetailPanelProps) {
  return (
    <aside className="detail-panel" aria-live="polite">
      <div className="detail-kicker">Ngày đang xem</div>
      <div className="detail-heading-row">
        <h2>{cell ? formatWeekday(cell.solar) : 'Chọn một ngày'}</h2>
        {cell?.lunar.day === 1 && <span className="detail-badge">Mùng 1</span>}
        {cell?.lunar.day === 15 && <span className="detail-badge">Rằm</span>}
      </div>
      <SelectedDateSummary cell={cell} today={today} />
      {cell && cell.holidays.length > 0 && (
        <div className="detail-holidays">
          <p className="detail-label">Ngày lễ</p>
          <ul>
            {cell.holidays.map((holiday) => <li key={holiday.name}>{holiday.name}</li>)}
          </ul>
        </div>
      )}
      <div className="detail-hint">
        <InfoMark />
        <p>Chạm vào một ngày bất kỳ để xem ngày âm tương ứng.</p>
      </div>
    </aside>
  )
}
