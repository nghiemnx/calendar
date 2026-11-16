import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

type IconButtonProps = ComponentProps<typeof Button> & {
  label: string
  children: ReactNode
}

export default function IconButton({ label, children, className = '', type = 'button', ...props }: IconButtonProps) {
  return (
    <Button variant="ghost" size="icon" className={`icon-button ${className}`.trim()} type={type} aria-label={label} {...props}>
      {children}
    </Button>
  )
}
