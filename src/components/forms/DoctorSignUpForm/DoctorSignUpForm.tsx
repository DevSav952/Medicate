'use client'

import { Input } from '@/components/ui/Input/Input'
import { useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IDoctorSignUp } from '@/interfaces/shared'
import { P } from '@/components/ui/Typography/Typography'
import { registerDoctor } from '@/lib/auth'
import { doctorSpecialties } from '@/mocks/shared'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { PhoneInput } from '@/components/ui/PhoneInput/PhoneInput'

import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

interface DoctorSignUpFormProps {
  handleClose: () => void
}

type DoctorValue = IDoctorSignUp & { verificationCode: string }

const DoctorSignUpForm = ({ handleClose }: DoctorSignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm<DoctorValue>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<DoctorValue> = async (values) => {
    console.log('values', values)

    // registerDoctor(values)

    // handleClose()
  }

  return (
    <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
      <div className='h-[400px] overflow-y-scroll'>
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
        <Input
          type='text'
          name='doctorName'
          id='doctorName'
          placeholder="Введіть ім'я"
          labelStyles='mt-1.5'
          obj={register('doctorName', {
            required: { value: true, message: "Поле обов'язкове" },
            minLength: { value: 2, message: "Ім'я має мінімум 2 символів" },
            maxLength: { value: 50, message: "Ім'я має максимум 20 символів" }
          })}>
          Ім'я
        </Input>
        {errors?.doctorName && <P className='text-red text-sm mb-1 dark:!text-red'>{errors.doctorName.message}</P>}

        <div className='mt-1.5'>
          <label className='block font-regular mb-2'>Спеціальність</label>
          <Dropdown options={doctorSpecialties} onChange={(value) => setValue('position', value)} />
        </div>

        <PhoneInput type='text' name='phone' id='phone' labelStyles='mt-1.5' obj={register('phone')}>
          Номер телефону
        </PhoneInput>

        <Input
          type='text'
          name='verificationCode'
          id='verificationCode'
          placeholder='Введіть код'
          labelStyles='mt-1.5'
          obj={register('verificationCode', {
            required: { value: true, message: "Поле обов'язкове" },
            validate: {
              aboba: (value) =>
                value === process.env.NEXT_PUBLIC_DOCTOR_SIGNUP_VERIFICATION_CODE || 'Невірний код підтвердження'
            }
          })}>
          Верифікаційний код
        </Input>
        {errors?.verificationCode && (
          <P className='text-red text-sm mb-1 dark:!text-red'>{errors.verificationCode.message}</P>
        )}
        <div className='relative flex flex-col mt-1.5'>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder='Пароль'
            name='password'
            id='password'
            obj={register('password', {
              required: { value: true, message: "Поле обов'язкове" },
              minLength: { value: 8, message: 'Пароль має мінімум 8 символів' },
              maxLength: { value: 20, message: 'Пароль має максимум 20 символів' }
            })}>
            Пароль
          </Input>
          <span
            onClick={() => setShowPassword((state) => !state)}
            className='absolute top-[43px] right-3.5 cursor-pointer'>
            {showPassword ? (
              <FaEye size={16} className='transition-all duration-200' />
            ) : (
              <FaEyeSlash size={16} className='transition-all duration-200' />
            )}
          </span>
        </div>
        {errors?.password && <P className='text-red text-sm my-1'>{errors.password.message}</P>}

        <div className='relative flex flex-col mt-1.5'>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Підтвердіть пароль'
            obj={register('confirmPassword', {
              required: { value: true, message: "Поле обов'язкове" },
              validate: (value) => value === watch('password') || 'Паролі не співпадають'
            })}>
            Підтвердіть пароль
          </Input>
          <span
            onClick={() => setShowConfirmPassword((state) => !state)}
            className='absolute top-[43px] right-3.5 cursor-pointer'>
            {showConfirmPassword ? (
              <FaEye
                size={16}
                className='dark:text-white-100 dark:lg:hover:text-purple-100 transition-all duration-200'
              />
            ) : (
              <FaEyeSlash
                size={16}
                className='dark:text-white-100 dark:lg:hover:text-purple-100 transition-all duration-200'
              />
            )}
          </span>
        </div>
        {errors?.confirmPassword && (
          <P className='text-red text-sm mb-1 dark:!text-red'>{errors.confirmPassword.message}</P>
        )}
      </div>

      <Button className='mt-5 w-full mb-4' type='submit'>
        Увійти
      </Button>
    </form>
  )
}
export default DoctorSignUpForm
