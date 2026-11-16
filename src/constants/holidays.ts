export type VietnameseHoliday = {
  name: string
  shortName: string
  isPublicHoliday: boolean
}

export type FixedHoliday = VietnameseHoliday & {
  month: number
  day: number
}

export const FIXED_HOLIDAYS: readonly FixedHoliday[] = [
  { month: 1, day: 1, name: 'Tết Dương lịch', shortName: 'Tết DL', isPublicHoliday: true },
  { month: 2, day: 14, name: 'Ngày Lễ Tình nhân', shortName: 'Valentine', isPublicHoliday: false },
  { month: 3, day: 8, name: 'Ngày Quốc tế Phụ nữ', shortName: '8/3', isPublicHoliday: false },
  { month: 4, day: 30, name: 'Ngày Giải phóng miền Nam', shortName: '30/4', isPublicHoliday: true },
  { month: 5, day: 1, name: 'Ngày Quốc tế Lao động', shortName: '1/5', isPublicHoliday: true },
  { month: 6, day: 1, name: 'Ngày Quốc tế Thiếu nhi', shortName: '1/6', isPublicHoliday: false },
  { month: 9, day: 2, name: 'Ngày Quốc khánh', shortName: 'Quốc khánh', isPublicHoliday: true },
  { month: 10, day: 20, name: 'Ngày Phụ nữ Việt Nam', shortName: '20/10', isPublicHoliday: false },
  { month: 11, day: 20, name: 'Ngày Nhà giáo Việt Nam', shortName: '20/11', isPublicHoliday: false },
  { month: 12, day: 25, name: 'Lễ Giáng sinh', shortName: 'Giáng sinh', isPublicHoliday: false },
]

export const LUNAR_HOLIDAYS = {
  tetNguyenDan: { month: 1, startDay: 1, endDay: 5, name: 'Tết Nguyên Đán', shortName: 'Tết', isPublicHoliday: true },
  gioToHungVuong: { month: 3, day: 10, name: 'Giỗ Tổ Hùng Vương', shortName: 'Giỗ Tổ', isPublicHoliday: true },
  vuLan: { month: 7, day: 15, name: 'Lễ Vu Lan', shortName: 'Vu Lan', isPublicHoliday: false },
  trungThu: { month: 8, day: 15, name: 'Tết Trung Thu', shortName: 'Trung Thu', isPublicHoliday: false },
} as const
