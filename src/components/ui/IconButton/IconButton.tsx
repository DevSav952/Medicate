import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface IconButtonProps {
  icon: any
  onClick: () => void
  className?: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge('flex items-center justify-center bg-[#0674d1] p-2.5 rounded', className)}
        onClick={onClick}
        {...props}>
        {icon}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'
