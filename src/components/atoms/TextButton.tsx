import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

type TextButtonProps = ComponentProps<typeof Button> & {
  tone: 'today' | 'apply'
  children: ReactNode
}

export default function TextButton({ tone, children, className = '', type = 'button', ...props }: TextButtonProps) {
  const variantClass = tone === 'today' ? 'today-button' : 'apply-button'

  return (
    <Button variant="ghost" className={`${variantClass} ${className}`.trim()} type={type} {...props}>
      {children}
    </Button>
  )
}
