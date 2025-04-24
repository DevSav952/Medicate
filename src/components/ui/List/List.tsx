import { forwardRef } from 'react'
import { FaCheck } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

type ListProps = {
  children?: React.ReactNode
  className?: string
}

type ListItemProps = {
  children?: React.ReactNode
  className?: string
}

export const Ul = forwardRef<HTMLUListElement, ListProps>(({ children, className }, ref) => (
  <ul ref={ref} className={twMerge('list-inside list-decimal', className)}>
    {children}
  </ul>
))

Ul.displayName = 'Ul'

export const Ol = forwardRef<HTMLOListElement, ListProps>(({ children, className }, ref) => (
  <ol ref={ref} className={twMerge('list-inside list-decimal', className)}>
    {children}
  </ol>
))

Ol.displayName = 'Ol'

export const UlItem = forwardRef<HTMLLIElement, ListItemProps>(({ children, className }, ref) => (
  <li className={twMerge('flex', className)} ref={ref}>
    <FaCheck fill='#56B0D2' className='mr-2.5 mt-2' />
    <span className='text-secondary text-lg font-primary'>{children}</span>
  </li>
))

UlItem.displayName = 'UlItem'

export const OlItem = forwardRef<HTMLLIElement, ListItemProps>(({ children, className }, ref) => (
  <li
    className={twMerge('marker:font-bold marker:text-accent text-lg text-accent font-light font-primary', className)}
    ref={ref}>
    {children}
  </li>
))

OlItem.displayName = 'OlItem'
