'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { Analyses } from '@/interfaces/Analyses.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { P } from '@/components/ui/Typography/Typography'
import { saveFileToBucket } from '@/lib/bucket'
import AttachmentPreviewModal from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { createAnalyses, updateAnalysesById } from '@/lib/analyses'
import { getSession } from '@/lib/auth'
import { Session } from '@/interfaces/Session.interface'
import { DatePicker } from '@/components/ui/DatePicker/date-picker'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

interface FormProps {
  analyses?: Analyses
}

type AnalysesValues = Omit<Analyses, '_id' | 'patientId' | 'fileName'>

const AddEditAnalysesForm = ({ analyses }: FormProps) => {
  const [fileName, setFileName] = useState(analyses?.fileName || '')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)
    })
  }, [])

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<AnalysesValues>({
    mode: 'onSubmit',
    defaultValues: {
      analysisName: analyses?.analysisName || '',
      description: analyses?.description || '',
      date: dayjs(analyses?.date).format('YYYY-MM-DD')
    }
  })

  const onSubmit: SubmitHandler<AnalysesValues> = async (values) => {
    if (analyses?._id) {
      const result = await updateAnalysesById({ _id: analyses._id, patientId: session?.id ?? '', ...values, fileName })

      if (result.success) {
        router.push(`/analyses/${analyses._id}`)
      }
    } else {
      const result = await createAnalyses({ patientId: session?.id ?? '', ...values, fileName })

      if (result.success) {
        router.push(`/mycabinet/patient/${session?.id}?tab=analyzes`)
      }
    }
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

      <div className='mb-4 w-full'>
        <label className='block font-regular mb-2'>Оберіть дату прийому</label>
        <DatePicker
          onChange={(date) => {
            setValue('date', dayjs(date).format('YYYY-MM-DD'))
          }}
          calendarModalStyles='w-full'
          initialDate={analyses?.date ? dayjs(analyses?.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')}
        />
      </div>

      <div className='mb-4'>
        <Textarea placeholder='Введіть назву аналізу' name='description' id='description' obj={register('description')}>
          Опис аналізу
        </Textarea>
        {errors?.description && <P className='text-red text-sm my-1'>{errors.description.message}</P>}
      </div>

      <div className='flex items-center gap-3'>
        {!fileName && (
          <Button
            onClick={() => {
              fileInputRef.current?.click()
            }}>
            Додати файл
          </Button>
        )}
        {fileName && <AttachmentPreviewModal attachment={fileName} />}

        {fileName && (
          <Button
            className='border border-solid border-red bg-transparent text-red'
            onClick={() => {
              setFileName('')
            }}>
            Скасувати
          </Button>
        )}

        <input
          ref={fileInputRef}
          type='file'
          name='file'
          id='file'
          accept='image/jpg, image/jpeg, image/png, application/pdf'
          className='hidden'
          onChange={async (e) => {
            const timestamp = Date.now()
            const extension = e.target.files![0].name.split('.').pop()

            const fileName = await saveFileToBucket(
              e.target.files![0],
              `analyses_${timestamp}.${extension}`,
              'beclinic/custom/files'
            )
            setFileName(fileName)
          }}
        />
      </div>

      <Button className='mt-5 w-full' type='submit'>
        Зберегти
      </Button>
    </form>
  )
}
export default AddEditAnalysesForm
