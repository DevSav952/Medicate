import Link from 'next/link'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type StyledLinkProps = {
  children: React.ReactNode
  className?: string
  href: string
}

export const StyledLink = forwardRef<HTMLAnchorElement, StyledLinkProps>(({ children, className, href }, ref) => (
  <a href={href} className={twMerge('text-[#0674d1]', className)} ref={ref}>
    {children}
  </a>
))

StyledLink.displayName = 'StyledLink'
