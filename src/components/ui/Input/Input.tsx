import { HTMLInputTypeAttribute, ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps {
  type?: HTMLInputTypeAttribute
  placeholder?: string
  name: string
  id?: string
  required?: boolean
  children?: ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  checked?: boolean
  disabled?: boolean
  obj?: object
  labelStyles?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, name, id, children, required, obj, onChange, value, checked, disabled, labelStyles }, ref) => {
    return (
      <>
        <label className={twMerge('block font-regular mb-2', labelStyles)} htmlFor={id}>
          {children}
        </label>
        <input
          required={required}
          className='font-regular opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full'
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
          ref={ref}
          disabled={disabled}
          {...obj}
        />
      </>
    )
  }
)
