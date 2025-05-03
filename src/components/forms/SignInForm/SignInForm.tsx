'use client'

import { Input } from '@/components/ui/Input/Input'
import { useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ISignIn } from '@/interfaces/shared'
import { P } from '@/components/ui/Typography/Typography'

import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

interface SignInFormProps {
  handleClose: () => void
}

const SignInForm = ({ handleClose }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ISignIn>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<ISignIn> = async (values) => {
    // login(values)
    console.log('values', values)
    // handleClose()
  }

  return (
    <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
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
      <div className='relative flex flex-col !mt-1.5'>
        <Input
          type='password'
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
      <Button className='mt-5 w-full' type='submit'>
        Увійти
      </Button>
    </form>
  )
}
export default SignInForm
