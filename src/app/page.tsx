import Calendar from '@/components/Calendar'
import { getVietnamDate } from '@/lib/calendar'

export default function Page() {
  return <Calendar initialToday={getVietnamDate(new Date())} />
}
