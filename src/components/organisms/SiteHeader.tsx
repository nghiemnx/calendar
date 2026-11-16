import BrandLockup from '@/components/molecules/BrandLockup'
import ThemeToggle from '@/components/atoms/ThemeToggle'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <BrandLockup />
      <div className="header-actions">
        <p className="header-note">Lịch Việt Nam · UTC+7</p>
        <ThemeToggle />
      </div>
    </header>
  )
}
