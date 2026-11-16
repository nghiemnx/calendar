import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lịch âm dương',
  description: 'Tra cứu lịch dương và lịch âm Việt Nam nhanh gọn.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { var theme = localStorage.getItem('calendar-theme'); document.documentElement.classList.toggle('dark', theme === 'dark'); } catch (_) { document.documentElement.classList.remove('dark'); }` }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
