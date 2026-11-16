import IconButton from '@/components/atoms/IconButton'

type MonthNavigatorProps = {
  label: string
  canGoPrevious: boolean
  canGoNext: boolean
  onPrevious: () => void
  onNext: () => void
  onOpenPicker: () => void
  pickerOpen: boolean
}

export default function MonthNavigator({ label, canGoPrevious, canGoNext, onPrevious, onNext, onOpenPicker, pickerOpen }: MonthNavigatorProps) {
  return (
    <div className="calendar-toolbar">
      <IconButton label="Tháng trước" onClick={onPrevious} disabled={!canGoPrevious}>←</IconButton>
      <button className="month-trigger" type="button" onClick={onOpenPicker} aria-expanded={pickerOpen} aria-haspopup="dialog">
        <span>{label}</span>
        <span className="month-trigger-icon" aria-hidden="true">⌄</span>
      </button>
      <IconButton label="Tháng sau" onClick={onNext} disabled={!canGoNext}>→</IconButton>
    </div>
  )
}
