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

interface DatePickerProps {
  startYear?: number
  endYear?: number
}
export function DatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>(new Date())

  const months = [
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
    if (selectedData) {
      setDate(selectedData)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[250px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
          <FaCalendarAlt className='mr-2 h-4 w-4 text-blue-100' />
          {date ? format(date, 'PPP', { locale: uk }) : <span> дату</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 bg-white'>
        <div className='flex justify-between p-2'>
          <Select onValueChange={handleMonthChange} value={months[getMonth(date)]}>
            <SelectTrigger className='w-[110px]'>
              <SelectValue placeholder='Month' />
            </SelectTrigger>
            <SelectContent className='bg-white'>
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
            <SelectContent className='bg-white'>
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
        />
      </PopoverContent>
    </Popover>
  )
}
