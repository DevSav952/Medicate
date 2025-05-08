import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  allowedAction?: () => void
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, allowedAction, onClick, type = 'button', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={twMerge(
          'flex items-center justify-center bg-[#0674d1] py-2.5 px-5 rounded text-white cursor-pointer',
          className
        )}
        onClick={allowedAction ? allowedAction : onClick}
        {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
