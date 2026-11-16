import TextButton from '@/components/atoms/TextButton'
import CalendarDayView from '@/components/organisms/CalendarDayView'
import CalendarGrid from '@/components/organisms/CalendarGrid'
import CalendarLegend from '@/components/molecules/CalendarLegend'
import MonthNavigator from '@/components/molecules/MonthNavigator'
import MonthYearPicker from '@/components/molecules/MonthYearPicker'
import ViewModeToggle, { type CalendarViewMode } from '@/components/molecules/ViewModeToggle'
import { type CalendarCell, type LunarDate, type SolarDate, type VietnameseHoliday } from '@/lib/calendar'

type CalendarPanelProps = {
  monthLabel: string
  monthNames: string[]
  yearOptions: number[]
  cells: CalendarCell[]
  selectedDate: SolarDate
  today: SolarDate
  canGoPrevious: boolean
  canGoNext: boolean
  pickerOpen: boolean
  pickerMonth: number
  pickerYear: number
  onPrevious: () => void
  onNext: () => void
  onOpenPicker: () => void
  onClosePicker: () => void
  onToday: () => void
  onApplyPicker: () => void
  onPickerMonthChange: (month: number) => void
  onPickerYearChange: (year: number) => void
  onSelectDate: (date: SolarDate) => void
  viewMode: CalendarViewMode
  onViewModeChange: (value: CalendarViewMode) => void
  selectedLunar: LunarDate
  selectedHolidays: VietnameseHoliday[]
  canGoPreviousDay: boolean
  canGoNextDay: boolean
  onPreviousDay: () => void
  onNextDay: () => void
}

export default function CalendarPanel({ monthLabel, monthNames, yearOptions, cells, selectedDate, today, canGoPrevious, canGoNext, pickerOpen, pickerMonth, pickerYear, onPrevious, onNext, onOpenPicker, onClosePicker, onToday, onApplyPicker, onPickerMonthChange, onPickerYearChange, onSelectDate, viewMode, onViewModeChange, selectedLunar, selectedHolidays, canGoPreviousDay, canGoNextDay, onPreviousDay, onNextDay }: CalendarPanelProps) {
  const isHolidayTheme = selectedHolidays.length > 0

  return (
    <div className={`calendar-panel${isHolidayTheme ? ' is-holiday-theme' : ''}`}>
      <div className="calendar-panel-topline">
        <ViewModeToggle value={viewMode} onChange={onViewModeChange} />
        {viewMode === 'month' && (
          <div className="calendar-toolbar-row desktop-calendar-toolbar">
            <MonthNavigator
              label={monthLabel}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              onPrevious={onPrevious}
              onNext={onNext}
              onOpenPicker={onOpenPicker}
              pickerOpen={pickerOpen}
            />
            <TextButton tone="today" onClick={onToday}>Hôm nay</TextButton>
          </div>
        )}
      </div>
      {viewMode === 'month' ? (
        <>
          <MonthYearPicker
            open={pickerOpen}
            month={pickerMonth}
            year={pickerYear}
            monthNames={monthNames}
            yearOptions={yearOptions}
            onMonthChange={onPickerMonthChange}
            onYearChange={onPickerYearChange}
            onApply={onApplyPicker}
            onClose={onClosePicker}
          />
          <CalendarLegend />
          <CalendarGrid label={monthLabel} cells={cells} selectedDate={selectedDate} today={today} onSelectDate={onSelectDate} />
          <p className="calendar-footnote">Số lớn là ngày dương · số nhỏ là ngày âm</p>
          <div className="mobile-calendar-actions" aria-label="Điều hướng lịch tháng">
            <MonthNavigator
              label={monthLabel}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              onPrevious={onPrevious}
              onNext={onNext}
              onOpenPicker={onOpenPicker}
              pickerOpen={pickerOpen}
            />
            <TextButton tone="today" onClick={onToday}>Hôm nay</TextButton>
          </div>
        </>
      ) : (
        <CalendarDayView
          date={selectedDate}
          lunar={selectedLunar}
          holidays={selectedHolidays}
          canGoPrevious={canGoPreviousDay}
          canGoNext={canGoNextDay}
          onPrevious={onPreviousDay}
          onNext={onNextDay}
          onToday={onToday}
        />
      )}
    </div>
  )
}
