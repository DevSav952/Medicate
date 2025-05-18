'use client'

import { HTMLInputTypeAttribute, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import InputMask from 'react-input-mask'

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
  obj?: object
  labelStyles?: string
}

export const PhoneInput = ({ name, id, children, obj, onChange, value, labelStyles }: InputProps) => {
  return (
    <>
      <label className={twMerge('block font-regular mb-2', labelStyles)} htmlFor={id}>
        {children}
      </label>

      <InputMask mask='+38 (099) 999-99-99' value={value} onChange={onChange} {...obj}>
        {(inputProps) => (
          <input
            {...inputProps}
            name={name}
            id={id}
            type='tel'
            placeholder='+38 (0__) ___-__-__'
            className='font-regular opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full'
          />
        )}
      </InputMask>
    </>
  )
}
