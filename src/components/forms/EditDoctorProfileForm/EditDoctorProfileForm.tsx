'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { P } from '@/components/ui/Typography/Typography'
import { Doctor } from '@/interfaces/Doctor.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { updateDoctorById } from '@/lib/doctor'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { saveFileToBucket } from '@/lib/bucket'
import { BUCKET_URL } from '@/constants/bucket'
import { mutate } from 'swr'
import { PhoneInput } from '@/components/ui/PhoneInput/PhoneInput'
import { toast } from 'sonner'

import { FaUser } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'

interface EditPatientProfileFormProps {
  doctor: Doctor
  handleClose: () => void
}

type DoctorValues = Omit<Doctor, '_id' | 'description'>

const EditDoctorProfileForm = ({ doctor, handleClose }: EditPatientProfileFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState(doctor.image)
  const [isEditImage, setIsEditImage] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<DoctorValues>({
    mode: 'onSubmit',
    defaultValues: {
      email: doctor.email,
      position: doctor.position,
      doctorName: doctor.doctorName,
      phone: doctor.phone
    }
  })

  const onSubmit: SubmitHandler<DoctorValues> = async (values) => {
    const result = await updateDoctorById({ _id: doctor._id ?? '', description: '', ...values, image: fileName })

    if (result.success) {
      await mutate(`/api/doctor/${doctor._id}`)
      handleClose()
    } else {
      toast.error('Помилка редагування лікаря', {
        duration: 3000,
        className: 'border border-red bg-red text-[#fff]'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
      <div>
        <div className='flex mb-4 flex-col'>
          <label className='block font-regular mb-2'>Фото профілю</label>

          <div className='relative h-[80px] w-[80px] rounded-full bg-[#2a41e812] shadow-md flex items-center justify-center text-blue-200 mb-4'>
            {fileName ? (
              <Image
                alt=''
                width={80}
                height={80}
                className='w-full h-full rounded-full'
                unoptimized
                src={`${BUCKET_URL}/custom/avatars/${fileName}`}
              />
            ) : (
              <FaUser className='dark:fill-grey-600' />
            )}

            <div className='flex items-center justify-center absolute right-[-25px] top-0'>
              <MdModeEdit
                className='dark:fill-grey-600'
                onClick={() => {
                  setIsEditImage(true)
                }}
              />
            </div>
          </div>
          {isEditImage && (
            <div className='flex items-center gap-3'>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }}>
                Завантажити
              </Button>
              <Button
                onClick={() => {
                  setFileName(doctor?.image)
                  setIsEditImage(false)
                }}>
                Cкасувати
              </Button>
              <Button
                className='bg-red'
                onClick={() => {
                  setFileName('')
                  setIsEditImage(false)
                }}>
                Видалити фото
              </Button>
              <input
                ref={fileInputRef}
                type='file'
                name='file'
                id='file'
                accept='image/jpg, image/jpeg, image/png'
                className='hidden'
                onChange={async (e) => {
                  const timestamp = Date.now()
                  const extension = e.target.files![0].name.split('.').pop()

                  const fileName = await saveFileToBucket(
                    e.target.files![0],
                    `${doctor?._id}_${timestamp}.${extension}`,
                    'beclinic/custom/avatars'
                  )

                  setFileName(fileName)
                  setIsEditImage(false)
                }}
              />
            </div>
          )}
        </div>

        <div className='mb-4'>
          <Input
            type='text'
            placeholder="Ваше ім'я"
            name='doctorName'
            id='doctorName'
            obj={register('doctorName', {
              required: { value: true, message: "Поле обов'язкове" },
              minLength: { value: 2, message: "Ім'я має мінімум 2 символів" },
              maxLength: { value: 50, message: "Ім'я має максимум 20 символів" }
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
          <PhoneInput type='text' name='phone' id='phone' obj={register('phone')}>
            Номер телефону
          </PhoneInput>
        </div>
      </div>

      <Button className='mt-5 w-full' type='submit'>
        Зберегти
      </Button>
    </form>
  )
}
export default EditDoctorProfileForm
