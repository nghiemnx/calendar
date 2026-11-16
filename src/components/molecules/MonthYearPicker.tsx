import IconButton from '@/components/atoms/IconButton'
import TextButton from '@/components/atoms/TextButton'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type MonthYearPickerProps = {
  open: boolean
  month: number
  year: number
  monthNames: string[]
  yearOptions: number[]
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
  onApply: () => void
  onClose: () => void
}

export default function MonthYearPicker({ open, month, year, monthNames, yearOptions, onMonthChange, onYearChange, onApply, onClose }: MonthYearPickerProps) {
  if (!open) return null

  return (
    <>
      <div className="picker-backdrop" aria-hidden="true" onClick={onClose} />
      <div className="picker-popover" role="dialog" aria-modal="true" aria-label="Chọn tháng và năm">
        <div className="picker-heading">
          <div>
            <span>Chọn thời gian</span>
            <small>Tra cứu nhanh tháng âm dương</small>
          </div>
          <IconButton className="close-button" label="Đóng" onClick={onClose}>×</IconButton>
        </div>
        <div className="picker-fields">
          <label>
            <span>Tháng</span>
            <Select value={String(month)} onValueChange={(value) => value && onMonthChange(Number(value))}>
              <SelectTrigger className="picker-select" aria-label="Tháng">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  {monthNames.map((name, index) => <SelectItem key={name} value={String(index + 1)}>{name}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>
          <label>
            <span>Năm</span>
            <Select value={String(year)} onValueChange={(value) => value && onYearChange(Number(value))}>
              <SelectTrigger className="picker-select" aria-label="Năm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  {yearOptions.map((option) => <SelectItem key={option} value={String(option)}>{option}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>
        </div>
        <TextButton tone="apply" onClick={onApply}>Áp dụng</TextButton>
      </div>
    </>
  )
}
