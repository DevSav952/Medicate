import Link from 'next/link'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type StyledLinkProps = {
  children: React.ReactNode
  className?: string
  href: string
  onClick?: () => void
}

export const StyledLink = forwardRef<HTMLAnchorElement, StyledLinkProps>(
  ({ children, className, href, onClick }, ref) => (
    <Link href={href} onClick={onClick} className={twMerge('flex font-primary text-[#0674d1]', className)} ref={ref}>
      {children}
    </Link>
  )
)

StyledLink.displayName = 'StyledLink'
