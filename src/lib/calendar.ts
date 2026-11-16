import { LichTa } from '@lichta/core'
import { FIXED_HOLIDAYS, LUNAR_HOLIDAYS, type VietnameseHoliday } from '../constants/holidays'

export type SolarDate = {
  year: number
  month: number
  day: number
}

export type LunarDate = SolarDate & {
  isLeap: boolean
  dayCanChi: string
  zodiac: Zodiac
}

export type Zodiac = {
  branch: string
  name: string
  symbol: string
}

export type { VietnameseHoliday } from '../constants/holidays'

export type CalendarCell = {
  solar: SolarDate
  lunar: LunarDate
  holidays: VietnameseHoliday[]
  isCurrentMonth: boolean
}

export const MIN_DATE: SolarDate = { year: 2000, month: 1, day: 1 }
export const MAX_DATE: SolarDate = { year: 2050, month: 12, day: 31 }

const VIETNAM_TIME_ZONE = 'Asia/Ho_Chi_Minh'
const LUNAR_MONTH_NAMES = ['', 'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Một', 'Chạp']
const WEEKDAY_NAMES = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
const ZODIACS: Zodiac[] = [
  { branch: 'Tý', name: 'Chuột', symbol: '🐭' },
  { branch: 'Sửu', name: 'Trâu', symbol: '🐮' },
  { branch: 'Dần', name: 'Hổ', symbol: '🐯' },
  { branch: 'Mão', name: 'Mèo', symbol: '🐰' },
  { branch: 'Thìn', name: 'Rồng', symbol: '🐲' },
  { branch: 'Tỵ', name: 'Rắn', symbol: '🐍' },
  { branch: 'Ngọ', name: 'Ngựa', symbol: '🐴' },
  { branch: 'Mùi', name: 'Dê', symbol: '🐐' },
  { branch: 'Thân', name: 'Khỉ', symbol: '🐵' },
  { branch: 'Dậu', name: 'Gà', symbol: '🐔' },
  { branch: 'Tuất', name: 'Chó', symbol: '🐶' },
  { branch: 'Hợi', name: 'Heo', symbol: '🐷' },
]

function dateToUtcDate(date: SolarDate): Date {
  return new Date(Date.UTC(date.year, date.month - 1, date.day))
}

function utcDateToSolarDate(date: Date): SolarDate {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  }
}

export function compareSolarDates(left: SolarDate, right: SolarDate): number {
  return dateToUtcDate(left).getTime() - dateToUtcDate(right).getTime()
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate()
}

export function weekdayMondayFirst(date: SolarDate): number {
  const sundayFirst = dateToUtcDate(date).getUTCDay()
  return sundayFirst === 0 ? 6 : sundayFirst - 1
}

export function addMonths(date: SolarDate, offset: number): SolarDate {
  const next = new Date(Date.UTC(date.year, date.month - 1 + offset, 1))
  const day = Math.min(date.day, daysInMonth(next.getUTCFullYear(), next.getUTCMonth() + 1))

  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day,
  }
}

export function addDays(date: SolarDate, offset: number): SolarDate {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + offset))

  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  }
}

export function getVietnamDate(now: Date): SolarDate {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: VIETNAM_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(now)
  const getPart = (type: 'year' | 'month' | 'day') => Number(parts.find((part) => part.type === type)?.value)

  return { year: getPart('year'), month: getPart('month'), day: getPart('day') }
}

export function solarToLunar(date: SolarDate): LunarDate {
  const lunar = LichTa.toLunar(date.day, date.month, date.year, 7)
  const dayCanChi = lunar.dayCanChi ?? ''
  const branch = dayCanChi.split(' ').at(-1) ?? ''
  const zodiac = ZODIACS.find((item) => item.branch === branch) ?? ZODIACS[0]

  return {
    day: lunar.day,
    month: lunar.month,
    year: lunar.year,
    isLeap: lunar.isLeap,
    dayCanChi,
    zodiac,
  }
}

export function getVietnameseHolidays(date: SolarDate, lunar: LunarDate = solarToLunar(date)): VietnameseHoliday[] {
  const holidays: VietnameseHoliday[] = []

  const fixedHoliday = FIXED_HOLIDAYS.find((holiday) => holiday.month === date.month && holiday.day === date.day)
  if (fixedHoliday) holidays.push(fixedHoliday)

  if (lunar.month === LUNAR_HOLIDAYS.tetNguyenDan.month && lunar.day >= LUNAR_HOLIDAYS.tetNguyenDan.startDay && lunar.day <= LUNAR_HOLIDAYS.tetNguyenDan.endDay) {
    holidays.push({
      ...LUNAR_HOLIDAYS.tetNguyenDan,
      name: `${LUNAR_HOLIDAYS.tetNguyenDan.name} · Mùng ${lunar.day}`,
    })
  }

  if (lunar.month === LUNAR_HOLIDAYS.gioToHungVuong.month && lunar.day === LUNAR_HOLIDAYS.gioToHungVuong.day) {
    holidays.push(LUNAR_HOLIDAYS.gioToHungVuong)
  }

  if (lunar.month === LUNAR_HOLIDAYS.vuLan.month && lunar.day === LUNAR_HOLIDAYS.vuLan.day) {
    holidays.push(LUNAR_HOLIDAYS.vuLan)
  }

  if (lunar.month === LUNAR_HOLIDAYS.trungThu.month && lunar.day === LUNAR_HOLIDAYS.trungThu.day) {
    holidays.push(LUNAR_HOLIDAYS.trungThu)
  }

  return holidays
}

export function buildMonthGrid(year: number, month: number): CalendarCell[] {
  const firstDay = { year, month, day: 1 }
  const leadingDays = weekdayMondayFirst(firstDay)
  const totalDays = daysInMonth(year, month)
  const totalCells = Math.ceil((leadingDays + totalDays) / 7) * 7
  const cells: CalendarCell[] = []

  for (let index = 0; index < totalCells; index += 1) {
    const offset = index - leadingDays
    const date = utcDateToSolarDate(new Date(Date.UTC(year, month - 1, 1 + offset)))
    cells.push({
      solar: date,
      lunar: solarToLunar(date),
      holidays: getVietnameseHolidays(date),
      isCurrentMonth: date.month === month,
    })
  }

  return cells
}

export function formatSolarDate(date: SolarDate): string {
  return `${String(date.day).padStart(2, '0')}/${String(date.month).padStart(2, '0')}/${date.year}`
}

export function formatLunarShort(date: LunarDate): string {
  if (date.day === 1) return `1/${date.month}${date.isLeap ? ' nhuận' : ''}`
  if (date.day === 15) return 'Rằm'
  return String(date.day)
}

export function formatLunarLong(date: LunarDate): string {
  const dayName = date.day === 1 ? 'Mùng 1' : date.day === 15 ? 'Rằm' : `Ngày ${date.day}`
  const monthName = LUNAR_MONTH_NAMES[date.month] ?? String(date.month)
  const leapName = date.isLeap ? ' nhuận' : ''
  return `${dayName} tháng ${monthName}${leapName} năm ${date.year} âm lịch`
}

export function formatWeekday(date: SolarDate): string {
  return WEEKDAY_NAMES[dateToUtcDate(date).getUTCDay()]
}

export function isSameSolarDate(left: SolarDate | null, right: SolarDate | null): boolean {
  return Boolean(left && right && compareSolarDates(left, right) === 0)
}

export function isMonthWithinRange(year: number, month: number): boolean {
  return compareSolarDates({ year, month, day: 1 }, MIN_DATE) >= 0 && compareSolarDates({ year, month, day: 1 }, MAX_DATE) <= 0
}

export function isDateWithinRange(date: SolarDate): boolean {
  return compareSolarDates(date, MIN_DATE) >= 0 && compareSolarDates(date, MAX_DATE) <= 0
}
