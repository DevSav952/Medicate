import { forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextareaProps {
  placeholder?: string
  name: string
  id?: string
  required?: boolean
  children?: ReactNode
  value?: string
  obj?: object
  labelStyles?: string
  rows?: number
}

export const Textarea = forwardRef<HTMLInputElement, TextareaProps>(
  ({ placeholder, name, id, children, required, obj, value, labelStyles, rows, ...props }, ref) => {
    return (
      <>
        <label className={twMerge('block font-regular mb-2', labelStyles)} htmlFor={id}>
          {children}
        </label>
        <textarea
          required={required}
          className='font-regular opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full resize-none'
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          rows={rows}
          {...props}
          {...obj}
        />
      </>
    )
  }
)
