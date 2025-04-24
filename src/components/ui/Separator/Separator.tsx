import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type SeparatorProps = {
  className?: string
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({ className }, ref) => (
  <div ref={ref} className={twMerge('my-4 h-[1px] w-full bg-[#edeff1]', className)} />
))

Separator.displayName = 'Separator'
