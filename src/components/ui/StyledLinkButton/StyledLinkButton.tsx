import Link from 'next/link'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type StyledLinkButtonProps = {
  children: React.ReactNode
  className?: string
  variant?: 'normal' | 'outline'
  href: string
  target?: string
}

const base =
  'inline-block text-xs font-bold font-primary uppercase tracking-[2px] px-5 py-3 rounded transition-all duration-300 ease-in-out'

const variants = {
  normal: 'text-blue-100 bg-white',
  outline: 'text-white border border-solid border-white'
} as const

export const StyledLinkButton = forwardRef<HTMLAnchorElement, StyledLinkButtonProps>(
  ({ children, className, variant = 'normal', href, target }, ref) => (
    <Link href={href} target={target} className={twMerge(base, variants[variant], className)} ref={ref}>
      {children}
    </Link>
  )
)

StyledLinkButton.displayName = 'StyledLinkButton'
