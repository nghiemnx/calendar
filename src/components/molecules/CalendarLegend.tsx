import LegendDot from '@/components/atoms/LegendDot'

export default function CalendarLegend() {
  return (
    <div className="calendar-legend" aria-label="Chú thích">
      <span><LegendDot tone="solar" />Dương lịch</span>
      <span><LegendDot tone="lunar" />Âm lịch</span>
      <span><LegendDot tone="holiday" />Ngày lễ</span>
    </div>
  )
}
