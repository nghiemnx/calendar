'use client'

import { useEffect, useRef, useState } from 'react'
import { APP_VERSION, parseVersionPayload } from '@/lib/app-version'

export default function AppUpdateNotice() {
  const [availableVersion, setAvailableVersion] = useState<string | null>(null)
  const checking = useRef(false)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function checkForUpdate() {
      if (checking.current || cancelled) return
      checking.current = true

      try {
        const response = await fetch('./version.json', {
          cache: 'no-store',
          signal: controller.signal,
        })
        if (!response.ok) return

        const payload = parseVersionPayload(await response.json())
        if (!cancelled && payload && payload.version !== APP_VERSION) setAvailableVersion(payload.version)
      } catch {
        // The calendar remains usable when the version check is unavailable.
      } finally {
        checking.current = false
      }
    }

    const timer = window.setTimeout(() => void checkForUpdate(), 800)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') void checkForUpdate()
    }
    const handlePageShow = () => void checkForUpdate()

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pageshow', handlePageShow)

    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  if (!availableVersion) return null

  return (
    <aside className="app-update-notice" role="status" aria-live="polite">
      <span>Có phiên bản mới · v{availableVersion}</span>
      <button type="button" onClick={() => window.location.reload()}>Cập nhật</button>
    </aside>
  )
}
