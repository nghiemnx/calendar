'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import IconButton from '@/components/atoms/IconButton'

const THEME_STORAGE_KEY = 'calendar-theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let storedTheme: string | null = null
      try { storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) } catch { /* Storage may be unavailable. */ }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const nextTheme = storedTheme === 'dark' || (!storedTheme && prefersDark) ? 'dark' : 'light'

      document.documentElement.classList.toggle('dark', nextTheme === 'dark')
      setTheme(nextTheme)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    try { window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme) } catch { /* Keep the theme usable without storage. */ }
    setTheme(nextTheme)
  }

  const isDark = theme === 'dark'

  return (
    <IconButton
      className="theme-toggle"
      label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      onClick={toggleTheme}
    >
      {isDark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
    </IconButton>
  )
}
