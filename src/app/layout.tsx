import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lịch âm dương',
  description: 'Tra cứu lịch dương và lịch âm Việt Nam nhanh gọn.',
  manifest: './manifest.webmanifest',
  icons: {
    icon: [{ url: './favicon.png', sizes: '64x64', type: 'image/png' }],
    apple: [{ url: './apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lịch Việt',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#365e49',
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
