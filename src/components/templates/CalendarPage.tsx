'use client'

import { useEffect, useMemo, useState } from 'react'
import CalendarPanel from '@/components/organisms/CalendarPanel'
import DateDetailPanel from '@/components/organisms/DateDetailPanel'
import SiteHeader from '@/components/organisms/SiteHeader'
import AppUpdateNotice from '@/components/molecules/AppUpdateNotice'
import type { CalendarViewMode } from '@/components/molecules/ViewModeToggle'
import { APP_VERSION } from '@/lib/app-version'
import {
  addDays,
  addMonths,
  buildMonthGrid,
  getVietnamDate,
  getVietnameseHolidays,
  isDateWithinRange,
  isMonthWithinRange,
  isSameSolarDate,
  MAX_DATE,
  MIN_DATE,
  solarToLunar,
  type SolarDate,
} from '@/lib/calendar'

type CalendarPageProps = {
  initialToday: SolarDate
}

const MONTH_NAMES = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
const YEAR_OPTIONS = Array.from({ length: MAX_DATE.year - MIN_DATE.year + 1 }, (_, index) => MIN_DATE.year + index)

function clampSelectedDay(day: number, year: number, month: number): SolarDate {
  const daysInTargetMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  return { year, month, day: Math.min(day, daysInTargetMonth) }
}

export default function CalendarPage({ initialToday }: CalendarPageProps) {
  const [today, setToday] = useState<SolarDate>(initialToday)
  const [viewDate, setViewDate] = useState<SolarDate>({ year: initialToday.year, month: initialToday.month, day: 1 })
  const [selectedDate, setSelectedDate] = useState<SolarDate>(initialToday)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerMonth, setPickerMonth] = useState(initialToday.month)
  const [pickerYear, setPickerYear] = useState(initialToday.year)
  const [viewMode, setViewMode] = useState<CalendarViewMode>('day')

  useEffect(() => {
    const updateDate = () => {
      const currentDate = getVietnamDate(new Date())
      setToday(currentDate)
      setViewDate((currentView) => isMonthWithinRange(currentDate.year, currentDate.month) ? { ...currentView, year: currentDate.year, month: currentDate.month } : currentView)
      setSelectedDate(currentDate)
    }
    const timer = window.setTimeout(updateDate, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const cells = useMemo(() => buildMonthGrid(viewDate.year, viewDate.month), [viewDate.year, viewDate.month])
  const selectedCell = cells.find((cell) => isSameSolarDate(cell.solar, selectedDate)) ?? cells.find((cell) => cell.isCurrentMonth)
  const previousMonth = addMonths({ ...viewDate, day: 1 }, -1)
  const nextMonth = addMonths({ ...viewDate, day: 1 }, 1)
  const canGoPrevious = isMonthWithinRange(previousMonth.year, previousMonth.month)
  const canGoNext = isMonthWithinRange(nextMonth.year, nextMonth.month)
  const monthLabel = `${MONTH_NAMES[viewDate.month - 1]} ${viewDate.year}`
  const selectedLunar = solarToLunar(selectedDate)
  const selectedHolidays = getVietnameseHolidays(selectedDate, selectedLunar)
  const previousDay = addDays(selectedDate, -1)
  const nextDay = addDays(selectedDate, 1)
  const canGoPreviousDay = isDateWithinRange(previousDay)
  const canGoNextDay = isDateWithinRange(nextDay)

  function moveMonth(offset: number) {
    const nextView = addMonths({ ...viewDate, day: selectedDate.day }, offset)
    if (!isMonthWithinRange(nextView.year, nextView.month)) return
    setViewDate({ ...nextView, day: 1 })
    setSelectedDate(clampSelectedDay(selectedDate.day, nextView.year, nextView.month))
  }

  function goToday() {
    const currentDate = getVietnamDate(new Date())
    setToday(currentDate)
    setViewDate({ year: currentDate.year, month: currentDate.month, day: 1 })
    setSelectedDate(currentDate)
    setPickerMonth(currentDate.month)
    setPickerYear(currentDate.year)
    setPickerOpen(false)
  }

  function applyPicker() {
    if (!isMonthWithinRange(pickerYear, pickerMonth)) return
    setViewDate({ year: pickerYear, month: pickerMonth, day: 1 })
    setSelectedDate(clampSelectedDay(selectedDate.day, pickerYear, pickerMonth))
    setPickerOpen(false)
  }

  function selectDate(date: SolarDate) {
    setSelectedDate(date)
    if (date.month !== viewDate.month || date.year !== viewDate.year) setViewDate({ year: date.year, month: date.month, day: 1 })
  }

  function moveDay(offset: number) {
    const nextDate = addDays(selectedDate, offset)
    if (!isDateWithinRange(nextDate)) return
    setSelectedDate(nextDate)
    setViewDate({ year: nextDate.year, month: nextDate.month, day: 1 })
  }

  return (
    <main className="page-shell">
      <SiteHeader />
      <section className={`calendar-layout${viewMode === 'day' ? ' is-day-view' : ''}`} aria-label="Lịch âm dương Việt Nam">
        <CalendarPanel
          monthLabel={monthLabel}
          monthNames={MONTH_NAMES}
          yearOptions={YEAR_OPTIONS}
          cells={cells}
          selectedDate={selectedDate}
          today={today}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          pickerOpen={pickerOpen}
          pickerMonth={pickerMonth}
          pickerYear={pickerYear}
          onPrevious={() => moveMonth(-1)}
          onNext={() => moveMonth(1)}
          onOpenPicker={() => { setPickerMonth(viewDate.month); setPickerYear(viewDate.year); setPickerOpen((open) => !open) }}
          onClosePicker={() => setPickerOpen(false)}
          onToday={goToday}
          onApplyPicker={applyPicker}
          onPickerMonthChange={setPickerMonth}
          onPickerYearChange={setPickerYear}
          onSelectDate={selectDate}
          viewMode={viewMode}
          onViewModeChange={(nextMode) => {
            setPickerOpen(false)
            setViewMode(nextMode)
          }}
          selectedLunar={selectedLunar}
          selectedHolidays={selectedHolidays}
          canGoPreviousDay={canGoPreviousDay}
          canGoNextDay={canGoNextDay}
          onPreviousDay={() => moveDay(-1)}
          onNextDay={() => moveDay(1)}
        />
        {viewMode === 'month' && <DateDetailPanel cell={selectedCell} today={today} />}
      </section>
      <AppUpdateNotice />
      <footer className="site-footer">
        <span>© {initialToday.year} Lịch âm dương</span>
        <span aria-hidden="true">·</span>
        <span>Hiển thị theo múi giờ UTC+7</span>
        <span aria-hidden="true">·</span>
        <span>v{APP_VERSION}</span>
      </footer>
    </main>
  )
}
