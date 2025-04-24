import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, className }, ref) => (
  <div className={twMerge('my-12 py-2 px-4 xl:max-w-[1200px] xl:mx-auto', className)} ref={ref}>
    {children}
  </div>
))
