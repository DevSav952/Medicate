import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type TypographyProps = {
  children?: React.ReactNode
  className?: string
}

export const H1 = forwardRef<HTMLHeadingElement, TypographyProps>(({ children, className }, ref) => {
  return (
    <h1 ref={ref} className={twMerge('font-bold font-primary text-[22px] text-primary xl:text-[36px]', className)}>
      {children}
    </h1>
  )
})

H1.displayName = 'H1'

export const H2 = forwardRef<HTMLHeadingElement, TypographyProps>(({ children, className }, ref) => {
  return (
    <h2 ref={ref} className={twMerge('font-bold font-primary text-[36px] text-primary', className)}>
      {children}
    </h2>
  )
})

H2.displayName = 'H2'

export const H3 = forwardRef<HTMLHeadingElement, TypographyProps>(({ children, className }, ref) => {
  return (
    <h3 ref={ref} className={twMerge('font-bold font-primary text-[26px] text-primary', className)}>
      {children}
    </h3>
  )
})

H3.displayName = 'H3'

export const H4 = forwardRef<HTMLHeadingElement, TypographyProps>(({ children, className }, ref) => {
  return (
    <h4 ref={ref} className={twMerge('font-bold font-primary text-[24px] text-primary', className)}>
      {children}
    </h4>
  )
})

H4.displayName = 'H4'

export const H5 = forwardRef<HTMLHeadingElement, TypographyProps>(({ children, className }, ref) => {
  return (
    <h5 ref={ref} className={twMerge('font-regular font-primary text-xl text-primary', className)}>
      {children}
    </h5>
  )
})

H5.displayName = 'H5'

export const H6 = forwardRef<HTMLHeadingElement, TypographyProps>(({ children, className }, ref) => {
  return (
    <h6 ref={ref} className={twMerge('font-bold font-primary text-lg text-primary', className)}>
      {children}
    </h6>
  )
})

H6.displayName = 'H6'

export const P = forwardRef<HTMLParagraphElement, TypographyProps>(({ children, className }, ref) => {
  return (
    <p ref={ref} className={twMerge('font-primary', className)}>
      {children}
    </p>
  )
})

P.displayName = 'P'
