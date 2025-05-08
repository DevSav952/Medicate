'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { P } from '@/components/ui/Typography/Typography'
import { Doctor } from '@/interfaces/Doctor.interface'
import { SubmitHandler, useForm } from 'react-hook-form'

interface EditPatientProfileFormProps {
  doctor: Doctor
  handleClose: () => void
}

type DoctorValues = Omit<Doctor, '_id' | 'description'>

const EditDoctorProfileForm = ({ doctor, handleClose }: EditPatientProfileFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = useForm<DoctorValues>({
    mode: 'onSubmit',
    defaultValues: {
      email: doctor.email,
      position: doctor.position,
      doctorName: doctor.doctorName,
      phone: doctor.position
    }
  })

  const onSubmit: SubmitHandler<DoctorValues> = async (values) => {
    // login(values)
    console.log('values', values)
    // handleClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
      <div>
        <div className='mb-4'>
          <Input
            type='text'
            placeholder="Ваше ім'я"
            name='doctorName'
            id='doctorName'
            obj={register('doctorName', {
              required: { value: true, message: "Поле обов'язкове" },
              minLength: { value: 2, message: "Ім'я має мінімум 2 символів" },
              maxLength: { value: 20, message: "Ім'я має максимум 20 символів" }
            })}>
            Ім'я
          </Input>
          {errors?.doctorName && <P className='text-red text-sm mb-1 dark:!text-red'>{errors.doctorName.message}</P>}
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
          {/* @TODO Add phoneNumber input mask  */}
          <Input type='text' placeholder='Введіть номер телефону' name='phone' id='phone' obj={register('phone')}>
            Номер телефону
          </Input>
        </div>
      </div>

      <Button className='mt-5 w-full' type='submit'>
        Зберегти
      </Button>
    </form>
  )
}
export default EditDoctorProfileForm
