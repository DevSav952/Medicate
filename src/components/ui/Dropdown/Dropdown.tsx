'use client'

import { useEffect, useRef, useState } from 'react'
import { SelectOption } from '@/interfaces/shared'
import { twMerge } from 'tailwind-merge'

import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface DropdownProps {
  options: SelectOption[]
  onChange: (option: string) => void
  disabled?: boolean
  defaultValue?: string
}

const Dropdown = ({ options, onChange, disabled, defaultValue }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(defaultValue || null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    if (disabled) return

    setIsOpen(!isOpen)
  }
  const handleSelect = (option: SelectOption) => {
    setSelected(option.label)
    onChange(option.value)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={twMerge(
          'flex justify-between items-center font-regular opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full',
          disabled && 'opacity-50'
        )}>
        {selected || 'Оберіть опцію'}

        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isOpen && (
        <div className='absolute z-10 w-full mt-1 border border-gray-300 rounded bg-white max-h-[150px] overflow-y-auto shadow'>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100'>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Dropdown
