import { describe, expect, it } from 'vitest'
import {
  addDays,
  addMonths,
  buildMonthGrid,
  daysInMonth,
  getVietnamDate,
  getVietnameseHolidays,
  solarToLunar,
} from './calendar'

describe('Vietnamese lunar calendar', () => {
  it('converts the day before Tet 2026', () => {
    expect(solarToLunar({ year: 2026, month: 2, day: 16 })).toMatchObject({ day: 29, month: 12, year: 2025, isLeap: false })
  })

  it('converts Tet 2026', () => {
    expect(solarToLunar({ year: 2026, month: 2, day: 17 })).toMatchObject({ day: 1, month: 1, year: 2026, isLeap: false })
  })

  it('provides the zodiac animal for the selected lunar day', () => {
    expect(solarToLunar({ year: 2026, month: 11, day: 16 })).toMatchObject({
      dayCanChi: 'Giáp Ngọ',
      zodiac: { branch: 'Ngọ', name: 'Ngựa', symbol: '🐴' },
    })
  })

  it('marks the Vietnamese leap month in 2004', () => {
    expect(solarToLunar({ year: 2004, month: 3, day: 21 })).toMatchObject({ day: 1, month: 2, year: 2004, isLeap: true })
  })

  it('builds a Monday-first calendar with a leap Gregorian February', () => {
    expect(daysInMonth(2024, 2)).toBe(29)
    expect(buildMonthGrid(2024, 2)).toHaveLength(35)
  })

  it('clamps a selected day when moving to a shorter month', () => {
    expect(addMonths({ year: 2026, month: 1, day: 31 }, 1)).toEqual({ year: 2026, month: 2, day: 28 })
  })

  it('moves across month boundaries in the day view', () => {
    expect(addDays({ year: 2026, month: 2, day: 28 }, 1)).toEqual({ year: 2026, month: 3, day: 1 })
  })

  it('includes Vietnamese public holidays', () => {
    expect(getVietnameseHolidays({ year: 2026, month: 1, day: 1 })).toContainEqual(expect.objectContaining({ name: 'Tết Dương lịch', isPublicHoliday: true }))
    expect(getVietnameseHolidays({ year: 2026, month: 4, day: 30 })).toContainEqual(expect.objectContaining({ name: 'Ngày Giải phóng miền Nam', isPublicHoliday: true }))
    expect(getVietnameseHolidays({ year: 2026, month: 2, day: 17 })).toContainEqual(expect.objectContaining({ name: 'Tết Nguyên Đán · Mùng 1', isPublicHoliday: true }))
  })

  it('includes common international and Vietnamese observances', () => {
    expect(getVietnameseHolidays({ year: 2026, month: 3, day: 8 })).toContainEqual(expect.objectContaining({ name: 'Ngày Quốc tế Phụ nữ' }))
    expect(getVietnameseHolidays({ year: 2026, month: 6, day: 1 })).toContainEqual(expect.objectContaining({ name: 'Ngày Quốc tế Thiếu nhi' }))
    expect(getVietnameseHolidays({ year: 2026, month: 10, day: 20 })).toContainEqual(expect.objectContaining({ name: 'Ngày Phụ nữ Việt Nam' }))
    expect(getVietnameseHolidays({ year: 2026, month: 12, day: 25 })).toContainEqual(expect.objectContaining({ name: 'Lễ Giáng sinh' }))
  })

  it('reads the calendar date in Vietnam time', () => {
    expect(getVietnamDate(new Date('2026-11-15T17:05:00.000Z'))).toEqual({ year: 2026, month: 11, day: 16 })
  })
})
