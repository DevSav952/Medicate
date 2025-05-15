'use client'

import { DatePicker } from '@/components/ui/DatePicker/date-picker'
import { CreateAppointment, IAppointment } from '@/interfaces/Appointment.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { SelectOption } from '@/interfaces/shared'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { doctorSpecialties } from '@/mocks/shared'
import useSWR from 'swr'
import { Doctor } from '@/interfaces/Doctor.interface'
import { fetcher } from '@/utils/fetcher'
import { Session } from '@/interfaces/Session.interface'
import { getSession } from '@/lib/auth'
import { createAppointment } from '@/lib/appointments'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'

// @TODO: block this page for non auth users
// @TODO: add validation for form

interface FormProps {
  appointment?: IAppointment
}

type AppointmentValues = Omit<CreateAppointment, 'endTime'> & {
  startTimeHours: string
}

const AddEditAppointmentForm = ({ appointment }: FormProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)
    })
  }, [])

  const { data: doctors } = useSWR<Doctor[]>(
    searchQuery ? `/api/searchTerms/doctor?search=${encodeURIComponent(searchQuery)}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false
    }
  )

  const doctorOptions = useMemo(() => {
    return doctors ? doctors.map((doctor: Doctor) => ({ value: doctor._id, label: doctor.doctorName })) : []
  }, [doctors])

  const timeOptions = useMemo(() => {
    const dates: SelectOption[] = []

    if (dayjs(selectedDate).day() === 0) {
      return []
    }

    for (let i = dayjs(selectedDate).get('hour') < 10 ? 10 : dayjs(selectedDate).get('hour'); i < 18; i++) {
      dates.push({ value: `${i}:00`, label: `${i}:00` })
    }

    return dates
  }, [selectedDate])

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<AppointmentValues>({
    mode: 'onSubmit',
    defaultValues: {
      patient: session?.id || '',
      reason: appointment?.reason || '',
      startTime: appointment?.startTime || '',
      doctor: appointment?.doctor._id || '',
      description: appointment?.description || ''
    }
  })

  const onSubmit: SubmitHandler<AppointmentValues> = async (values) => {
    const newAppointment: CreateAppointment = {
      ...values,
      patient: session?.id ?? '',
      startTime: dayjs(selectedDate)
        .add(Number(values.startTimeHours.slice(0, 2)), 'hour')
        .toISOString(),
      endTime: dayjs(selectedDate)
        .add(Number(values.startTimeHours.slice(0, 2)) + 1, 'hour')
        .toISOString()
    }

    await createAppointment(newAppointment)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-1.5'>
        <Input name='reason' placeholder='Причина візиту' id='reason' obj={register('reason')}>
          Причина візиту
        </Input>
      </div>

      <div className='mt-1.5 w-full'>
        <label className='block font-regular mb-2'>Оберіть спеціальність лікаря</label>
        <Dropdown
          options={doctorSpecialties}
          onChange={(option) => {
            setSearchQuery(option)
          }}
        />
      </div>

      <div className='mt-1.5 w-full'>
        <label className='block font-regular mb-2'>Оберіть лікаря</label>

        <Dropdown
          options={doctorOptions}
          onChange={(option) => {
            setValue('doctor', option)
            setSearchQuery(option)
          }}
          disabled={!searchQuery}
        />
      </div>

      <div className='sm:flex sm:justify-between sm:gap-4'>
        <div className='mt-1.5 w-full'>
          <label className='block font-regular mb-2'>Оберіть дату прийому</label>
          <DatePicker
            onChange={(date) => {
              setValue('startTime', dayjs(date).format('YYYY-MM-DD'))
              setSelectedDate(dayjs(date).format('YYYY-MM-DD'))
            }}
            calendarModalStyles='w-full'
            initialDate={
              appointment?.startTime ? dayjs(appointment?.startTime).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
            }
          />
        </div>
        <div className='mt-1.5 w-full'>
          <label className='block font-regular mb-2'>Оберіть час прийому</label>
          <Dropdown options={[...timeOptions]} onChange={(option) => setValue('startTimeHours', option)} />
        </div>
      </div>
      <div className='mt-1.5'>
        <Textarea
          placeholder='Причини прийому'
          name='description'
          id='description'
          obj={register('description')}
          rows={5}>
          Причини прийому
        </Textarea>
      </div>

      <Button className='mt-5 w-full' type='submit'>
        Зберегти
      </Button>
    </form>
  )
}
export default AddEditAppointmentForm
