'use client'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Patient } from '@/interfaces/Patient.interface'
import { P } from '@/components/ui/Typography/Typography'
import { updatePatientById } from '@/lib/patient'
import { getSession } from '@/lib/auth'
import { useEffect, useState } from 'react'
import { Session } from '@/interfaces/Session.interface'
import { DatePicker } from '@/components/ui/DatePicker/date-picker'
import dayjs from 'dayjs'
import { Select } from '@/components/ui/Select/Select'

interface EditPatientProfileFormProps {
  patient: Patient
  handleClose: () => void
}

type PatientValues = Omit<Patient, '_id'>

const bloodOptions = [
  {
    label: 'O (I)',
    value: 'O (I)'
  },
  {
    label: 'A (II)',
    value: 'A (II)'
  },
  {
    label: 'B (III)',
    value: 'B (III)'
  },
  {
    label: 'AB (IV)',
    value: 'AB (IV)'
  }
]

const rhOptions = [
  {
    label: 'Rh +',
    value: 'Rh +'
  },
  {
    label: 'Rh -',
    value: 'Rh -'
  }
]

const EditPatientProfileForm = ({ patient, handleClose }: EditPatientProfileFormProps) => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getSession().then((session) => setSession(session))
  }, [])

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = useForm<PatientValues>({
    mode: 'onSubmit',
    defaultValues: {
      email: patient.email,
      userName: patient.userName,
      dateOfBirth: patient.dateOfBirth,
      phoneNumber: patient.phoneNumber,
      bloodType: patient.bloodType,
      diabetes: patient.diabetes,
      rhFactor: patient.rhFactor,
      bloodTransfusion: patient.bloodTransfusion,
      intoleranceToMedicines: patient.intoleranceToMedicines,
      infectiousDiseases: patient.infectiousDiseases,
      surgicalInterventions: patient.surgicalInterventions,
      allergies: patient.allergies
    }
  })

  const onSubmit: SubmitHandler<PatientValues> = async (values) => {
    if (!session) return

    const result = await updatePatientById({ _id: session.id ?? '', ...values })

    if (result) {
      handleClose()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Input
          type='text'
          placeholder="Ваше ім'я"
          name='userName'
          id='userName'
          obj={register('userName', {
            required: { value: true, message: "Поле обов'язкове" },
            minLength: { value: 2, message: "Ім'я має мінімум 2 символів" },
            maxLength: { value: 50, message: "Ім'я має максимум 20 символів" }
          })}>
          Ім'я
        </Input>
        {errors?.userName && <P className='text-red text-sm mb-1 dark:!text-red'>{errors.userName.message}</P>}
      </div>

      <div className='mb-4'>
        <Input
          type='email'
          placeholder='example@email.com'
          name='email'
          id='email'
          obj={register('email', {
            required: { value: true, message: "Поле обов'язкове" },
            pattern: { value: /^\S+@\S+$/i, message: 'Невірна електронна пошта' }
          })}>
          Електронна пошта
        </Input>
        {errors?.email && <P className='text-red text-sm my-1'>{errors.email.message}</P>}
      </div>

      <div className='mb-4'>
        <label htmlFor='dateOfBirth' className='block font-regular mb-2'>
          Дата народження
        </label>
        <DatePicker
          initialDate={patient.dateOfBirth}
          onChange={(date) => setValue('dateOfBirth', dayjs(date).format('YYYY-MM-DD'))}
          calendarModalStyles='w-full'
        />
      </div>

      <div className='mb-4'>
        {/* @TODO Add phoneNumber input mask  */}
        <Input
          type='text'
          placeholder='Введіть номер телефону'
          name='phoneNumber'
          id='phoneNumber'
          obj={register('phoneNumber')}>
          Номер телефону
        </Input>
      </div>

      <div className='mb-4'>
        <Select
          id='bloodType'
          name='bloodType'
          value={watch('bloodType') ?? ''}
          options={bloodOptions}
          onChange={(e) => setValue('bloodType', e.target.value)}>
          Група крові
        </Select>
      </div>

      <div className='mb-4'>
        <Input type='text' placeholder='Діабет' name='diabetes' id='diabetes' obj={register('diabetes')}>
          Діабет
        </Input>
      </div>

      <div className='mb-4'>
        <Select
          id='rhFactor'
          name='rhFactor'
          value={watch('rhFactor') ?? ''}
          options={rhOptions}
          onChange={(e) => setValue('rhFactor', e.target.value)}>
          Резус фактор
        </Select>
      </div>

      <div className='mb-4'>
        <Input
          type='text'
          placeholder='Переливання крові'
          name='bloodTransfusion'
          id='bloodTransfusion'
          obj={register('bloodTransfusion')}>
          Переливання крові
        </Input>
      </div>

      <div className='mb-4'>
        <Input
          type='text'
          placeholder='Непереносимість ліків'
          name='intoleranceToMedicines'
          id='intoleranceToMedicines'
          obj={register('intoleranceToMedicines')}>
          Непереносимість ліків
        </Input>
      </div>

      <div className='mb-4'>
        <Input
          type='text'
          placeholder='Інфекційні захворювання'
          name='infectiousDiseases'
          id='infectiousDiseases'
          obj={register('infectiousDiseases')}>
          Інфекційні захворювання
        </Input>
      </div>

      <div className='mb-4'>
        <Input
          type='text'
          placeholder='Хірургічні втручання'
          name='surgicalInterventions'
          id='surgicalInterventions'
          obj={register('surgicalInterventions')}>
          Хірургічні втручання
        </Input>
      </div>

      <div className='mb-4'>
        <Input type='text' placeholder='Алергії' name='allergies' id='allergies' obj={register('allergies')}>
          Алергії
        </Input>
      </div>

      <Button className='mt-5 w-full' type='submit'>
        Зберегти
      </Button>
    </form>
  )
}
export default EditPatientProfileForm
