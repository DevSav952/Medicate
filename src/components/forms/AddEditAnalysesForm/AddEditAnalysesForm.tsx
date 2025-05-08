'use client'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { Analyses } from '@/interfaces/Analyses.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { P } from '@/components/ui/Typography/Typography'

const AddEditAnalysesForm = () => {
  const [isFileUploaded, setFileUploaded] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Analyses>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<Analyses> = async (values) => {
    // login(values)
    console.log('values', values)
    // handleClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Input
          type='text'
          placeholder='Введіть назву аналізу'
          name='analysisName'
          id='analysisName'
          obj={register('analysisName', {
            required: { value: true, message: "Поле обов'язкове" },
            minLength: { value: 3, message: 'Назва аналізу має містити мінімум 3 символи' }
          })}>
          Назва аналізу
        </Input>
        {errors?.analysisName && <P className='text-red text-sm my-1'>{errors.analysisName.message}</P>}
      </div>

      <div className='mb-4'>
        <Textarea placeholder='Введіть назву аналізу' name='description' id='description' obj={register('description')}>
          Опис аналізу
        </Textarea>
        {errors?.description && <P className='text-red text-sm my-1'>{errors.description.message}</P>}
      </div>

      {/* @TODO finish adding files section */}
      <div className='flex items-center gap-3'>
        <Button
          onClick={(e) => {
            console.log('here')

            fileInputRef.current?.click()
          }}>
          Додати файл
        </Button>
        {isFileUploaded && (
          <Button className='!border-red !text-red' onClick={() => {}}>
            Скасувати
          </Button>
        )}

        <input
          ref={fileInputRef}
          type='file'
          name='file'
          id='file'
          accept='image/*'
          className='hidden'
          onChange={async (e) => {}}
        />
      </div>

      <Button className='mt-5 w-full' type='submit'>
        Зберегти
      </Button>
    </form>
  )
}
export default AddEditAnalysesForm
