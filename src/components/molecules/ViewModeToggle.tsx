import { Button } from '@/components/ui/button'

export type CalendarViewMode = 'month' | 'day'

type ViewModeToggleProps = {
  value: CalendarViewMode
  onChange: (value: CalendarViewMode) => void
}

const OPTIONS: Array<{ value: CalendarViewMode; label: string }> = [
  { value: 'month', label: 'Tháng' },
  { value: 'day', label: 'Ngày' },
]

export default function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="view-mode-toggle" aria-label="Chế độ xem" role="group">
      {OPTIONS.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          className={`view-mode-button${value === option.value ? ' is-active' : ''}`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
