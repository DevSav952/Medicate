import { SelectOption } from '@/interfaces/shared'
import { ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface SelectProps {
  name: string
  id?: string
  required?: boolean
  children?: ReactNode
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value?: string
  obj?: object
  labelStyles?: string
  selectStyles?: string
  options: SelectOption[]
  size?: number
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ name, id, children, required, obj, onChange, value, labelStyles, options, selectStyles, size }, ref) => {
    return (
      <>
        <label className={twMerge('block font-regular mb-2', labelStyles)} htmlFor={id}>
          {children}
        </label>
        <select
          size={size}
          required={required}
          className={twMerge('font-regular opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full', selectStyles)}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          ref={ref}
          {...obj}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    )
  }
)
