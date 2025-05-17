'use client'

import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Patient } from '@/interfaces/Patient.interface'
import { P } from '@/components/ui/Typography/Typography'
import { updatePatientById } from '@/lib/patient'
import { useRef, useState } from 'react'
import { DatePicker } from '@/components/ui/DatePicker/date-picker'
import dayjs from 'dayjs'
import { Select } from '@/components/ui/Select/Select'
import { mutate } from 'swr'
import { saveFileToBucket } from '@/lib/bucket'
import { BUCKET_URL } from '@/constants/bucket'
import Image from 'next/image'

import { FaUser } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'

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
  const [isFileUploaded, setFileUploaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState(patient.image)
  const [isEditImage, setIsEditImage] = useState(false)

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
    const result = await updatePatientById({ _id: patient._id ?? '', ...values, image: fileName })

    if (result) {
      mutate(`/api/patient/${patient._id}`)
      handleClose()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                setFileUploaded(true)
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
                setFileName(patient?.image)
                setFileUploaded(false)
                setIsEditImage(false)
              }}>
              Cкасувати
            </Button>
            <Button
              className='bg-red'
              onClick={() => {
                setFileName('')
                setFileUploaded(true)
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
                  `${patient?._id}_${timestamp}.${extension}`,
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
