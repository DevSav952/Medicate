'use client'

import * as React from 'react'
import { format, getMonth, getYear, setMonth, setYear } from 'date-fns'
import { FaCalendarAlt } from 'react-icons/fa'
import { uk } from 'date-fns/locale'

import { cn } from '@/utils/cn'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import dayjs from 'dayjs'

interface DatePickerProps {
  startYear?: number
  initialDate?: string
  endYear?: number
  calendarModalStyles?: string
  showOutsideDays?: boolean
  disabled?: boolean
  onChange?: (date: Date) => void
}

const MONTHS = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень'
]

export function DatePicker({
  startYear = getYear(new Date()),
  endYear = getYear(new Date()) + 25,
  initialDate,
  calendarModalStyles,
  showOutsideDays,
  disabled,
  onChange
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>(initialDate ? new Date(initialDate) : new Date())

  React.useEffect(() => {
    if (onChange) {
      onChange(date)
    }
  }, [date, onChange])

  const months = React.useMemo(() => {
    return dayjs(date).isSame(dayjs(), 'year') ? MONTHS.slice(getMonth(new Date()), MONTHS.length) : MONTHS
  }, [date])

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date, months.indexOf(month))
    setDate(newDate)
  }

  const handleYearChange = (year: string) => {
    const newDate = setYear(date, parseInt(year))
    setDate(newDate)
  }

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData && dayjs(selectedData).isAfter(dayjs())) {
      setDate(selectedData)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
          <FaCalendarAlt className='mr-2 h-4 w-4 text-blue-100' />
          {date ? format(date, 'PPP', { locale: uk }) : <span> дату</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('p-0 bg-white z-[120]', calendarModalStyles)}>
        <div className='flex justify-between p-2'>
          <Select onValueChange={handleMonthChange} value={months[getMonth(date)]}>
            <SelectTrigger className='w-[110px]'>
              <SelectValue placeholder='Month' />
            </SelectTrigger>
            <SelectContent className='bg-white z-[121]'>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleYearChange} value={getYear(date).toString()}>
            <SelectTrigger className='w-[110px]'>
              <SelectValue placeholder='Year' />
            </SelectTrigger>
            <SelectContent className='bg-white z-[121]'>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode='single'
          selected={date}
          onSelect={handleSelect}
          initialFocus
          month={date}
          onMonthChange={setDate}
          className='w-full'
          showOutsideDays={showOutsideDays}
        />
      </PopoverContent>
    </Popover>
  )
}
