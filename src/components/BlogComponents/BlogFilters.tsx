'use client'

import { P } from '@/components/ui/Typography/Typography'
import { getPostWord } from '@/utils/getPostWord'
import { useState } from 'react'
import { IconButton } from '@/components/ui/IconButton/IconButton'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/Button/Button'

import { FaFilter } from 'react-icons/fa6'

interface BlogItemProps {
  length: number
}

const options = [
  {
    label: 'Найновіші',
    value: 'asc'
  },
  {
    label: 'Найстаріші',
    value: 'desc'
  },
  {
    label: 'Популярні',
    value: 'popular'
  }
]

interface IFilters {
  category: string[]
  auditory: string[]
  symptoms: string[]
}

const categories = [
  { label: 'Хвороби', value: 'diseases' },
  { label: 'Харчування і дієти', value: 'nutrition' },
  { label: "Фітнес і здоров'я", value: 'fitness' },
  { label: 'Медицина', value: 'medicine' },
  { label: 'Психологія', value: 'psychology' },
  { label: 'Препарати', value: 'medications' }
]

const auditory = [
  { label: 'Для лікарів', value: 'doctors' },
  { label: 'Для пацієнтів', value: 'patients' },
  { label: 'Для батьків', value: 'parents' },
  { label: 'Для спортсменів', value: 'athletes' },
  { label: 'Для літніх людей', value: 'elder' }
]

const symptoms = [
  { label: 'Головний біль', value: 'headache' },
  { label: 'Біль у животі', value: 'abdominal-pain' },
  { label: 'Підвищена температура', value: 'fever' },
  { label: 'Шкірні висипання', value: 'skin-rash' }
]

const CheckboxGroup = ({
  name,
  options,
  control
}: {
  name: string
  options: { label: string; value: string }[]
  control: any
}) => {
  return (
    <div>
      {options.map((option) => (
        <Controller
          key={option.value}
          name={name}
          control={control}
          render={({ field }) => {
            const isChecked = field.value?.includes(option.value)

            const handleChange = (e) => {
              const newValue = e.target.value
              if (isChecked) {
                field.onChange(field.value.filter((v) => v !== newValue))
              } else {
                field.onChange([...(field.value || []), newValue])
              }
            }

            return (
              <label style={{ display: 'block' }} className='font-primary font-light'>
                <input
                  type='checkbox'
                  value={option.value}
                  checked={isChecked}
                  onChange={handleChange}
                  className='mr-2'
                />
                {option.label}
              </label>
            )
          }}
        />
      ))}
    </div>
  )
}

const BlogFilters = ({ length }: BlogItemProps) => {
  const [selectedType, setType] = useState<string | null>(null)
  const [isOpenFilters, setOpenFilters] = useState(false)

  const { control, handleSubmit } = useForm<IFilters>({
    mode: 'onSubmit',
    defaultValues: {
      category: [],
      auditory: [],
      symptoms: []
    }
  })

  const onSubmit: SubmitHandler<IFilters> = async (values) => {
    console.log('values', values)
  }

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center justify-center'>
          <P className='font-light text-[#616262]'>
            Знайдено {length} {getPostWord(length)}
          </P>
        </div>
        <div className='flex gap-4'>
          <select
            id='sort'
            value={selectedType ?? ''}
            onChange={(e) => setType(e.target.value)}
            className='font-light text-[#616262] px-3 py-1.5 rounded border border-grey-400 w-full'>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <IconButton icon={<FaFilter fill='#fff' />} allowedAction={() => setOpenFilters(!isOpenFilters)} />
        </div>
      </div>
      {isOpenFilters && (
        <div
          className='fixed top-0 left-0 w-full h-screen z-10 bg-neutral-800 opacity-50'
          onClick={() => setOpenFilters(!isOpenFilters)}
        />
      )}
      <div
        className={twMerge(
          'bg-slate-300 fixed top-0 left-[-100%] h-[100dvh] w-[290px] px-2.5 z-[20] flex justify-between flex-col transition-all ease-in-out duration-300',
          isOpenFilters && 'py-2.5 px-5 left-0'
        )}>
        <div className='pt-6'>
          <P className='text-xl font-bold'>Фільтри</P>
          <form className='pt-6 flex flex-col justify-between' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <P className='font-bold my-2'>За катерогією</P>
              <CheckboxGroup name='category' options={categories} control={control} />

              <P className='font-bold my-2'>За аудиторією</P>
              <CheckboxGroup name='auditory' options={auditory} control={control} />

              <P className='font-bold my-2'>За симптомами</P>
              <CheckboxGroup name='symptoms' options={symptoms} control={control} />
            </div>

            <Button className='mt-8 w-full ' type='submit'>
              Зберегти
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
export default BlogFilters
