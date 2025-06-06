import { DatePicker } from '@/components/ui/DatePicker/date-picker'
import { CreateAppointment, IAppointment, EditAppointment } from '@/interfaces/Appointment.interface'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import dayjs from 'dayjs'
import { useMemo, useRef, useState } from 'react'
import { SelectOption } from '@/interfaces/shared'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { doctorSpecialties } from '@/mocks/shared'
import useSWR from 'swr'
import { Doctor } from '@/interfaces/Doctor.interface'
import { fetcher } from '@/utils/fetcher'
import { Session } from '@/interfaces/Session.interface'
import { createAppointment, updateAppointmentById } from '@/lib/appointments'
import { Input } from '@/components/ui/Input/Input'
import { Analyses } from '@/interfaces/Analyses.interface'
import SelectAnalyzesModal from '@/components/modals/SelectAnalyzesModal/SelectAnalyzesModal'
import { H6, P } from '@/components/ui/Typography/Typography'
import AnalysesCard from '@/components/AnalyzesCard/AnalyzesCard'
import { Button } from '@/components/ui/Button/Button'
import { saveFileToBucket } from '@/lib/bucket'
import AttachmentPreviewModal from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { twMerge } from 'tailwind-merge'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import MedicineCard from '@/components/MedicineCard/MedicineCard'
import { IMedicine } from '@/interfaces/Medicine.interface'
import SelectMedicineModal from '@/components/modals/SelectMedicineModal/SelectMedicineModal'
import { sendAppointmentEmail } from '@/lib/resend'

// @TODO: block this page for non auth users

interface FormProps {
  session: Session
  appointment?: IAppointment
}

type AppointmentValues = Omit<CreateAppointment, 'endTime'> & {
  startTimeHours: string
}

/**
 * Validation:
 * doctor - required
 * startTime - required
 * endTime - required
 * reason - required
 * description - optional
 * analyzes - optional
 * fileName - optional
 *
 *  medicine - optional
 *  diagnosis - optional
 *  treatment - optional
 */

const AddEditAppointmentForm = ({ appointment, session }: FormProps) => {
  const isEditMode = !!appointment?._id
  const isDoctor = session.role === 'doctor'

  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string | null>(
    dayjs(appointment?.startTime).format('YYYY-MM-DD') || null
  )
  const [searchQuery, setSearchQuery] = useState(appointment?.doctor.position || '')
  const [analyses, setAnalyzes] = useState<Analyses[]>(appointment?.analyzes || [])
  const [medicine, setMedicine] = useState<IMedicine[]>(appointment?.medicine || [])

  const [fileName, setFileName] = useState(appointment?.fileName || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    setValue,
    control
  } = useForm<AppointmentValues>({
    mode: 'onSubmit',
    defaultValues: {
      patient: appointment?.patient._id || '',
      reason: appointment?.reason || '',
      startTime: appointment?.startTime || '',
      doctor: appointment?.doctor._id || '',
      description: appointment?.description || '',
      medicine: appointment?.medicine || [],
      diagnosis: appointment?.diagnosis || '',
      treatment: appointment?.treatment || ''
    }
  })

  const onSubmit: SubmitHandler<AppointmentValues> = async (values) => {
    if (appointment?._id) {
      const editAppointment: EditAppointment = {
        ...values,
        _id: appointment._id,
        patient: appointment?.patient._id ?? '',
        startTime: dayjs(selectedDate)
          .add(
            Number(values.startTimeHours ? values.startTimeHours.slice(0, 2) : dayjs(appointment.startTime).hour()),
            'hour'
          )
          .toISOString(),
        endTime: dayjs(selectedDate)
          .add(
            Number(values.startTimeHours ? values.startTimeHours.slice(0, 2) : dayjs(appointment.startTime).hour()) + 1,
            'hour'
          )
          .toISOString(),
        analyzes: analyses.map((analyzes) => analyzes._id),
        fileName: fileName,
        medicine: medicine
      }

      const result = await updateAppointmentById(editAppointment)

      if (result.success) {
        toast.success('Візит успішно оновлено', {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-[#fff]'
        })

        router.push(`/appointments/${result.appointmentId}`)
      } else {
        toast.success('Помилка оновлення візиту', {
          duration: 3000,
          className: 'border border-red bg-red text-[#fff]'
        })
      }
    } else {
      const newAppointment: CreateAppointment = {
        ...values,
        patient: session?.id ?? '',
        startTime: dayjs(selectedDate)
          .add(Number(values.startTimeHours.slice(0, 2)), 'hour')
          .toISOString(),
        endTime: dayjs(selectedDate)
          .add(Number(values.startTimeHours.slice(0, 2)) + 1, 'hour')
          .toISOString(),
        analyzes: analyses.map((analyzes) => analyzes._id),
        fileName: fileName,
        reason: values.reason
      }

      const result = await createAppointment(newAppointment)

      if (result.success) {
        await sendAppointmentEmail({
          appointmentId: result.appointmentId,
          patientName: session.userName ?? '',
          appointmentDate: dayjs(selectedDate).format('YYYY-MM-DD'),
          appointmentTime: values.startTimeHours,
          doctorName: doctorOptions.find((option) => option.value === newAppointment.doctor)?.label ?? '',
          patientEmail: session.email ?? ''
        })

        toast.success('Візит успішно створено', {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-[#fff]'
        })

        router.push(`/appointments/${result.appointmentId}`)
      } else {
        toast.success('Помилка створення візиту', {
          duration: 3000,
          className: 'border border-red bg-red text-[#fff]'
        })
      }
    }
  }

  const onMedicineDelete = (medicineName: string) => {
    setMedicine(medicine.filter((item) => item.medicineName !== medicineName))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isDoctor && (
          <>
            <div className='mt-1.5'>
              <Input name='diagnosis' placeholder='Діагноз' id='diagnosis' obj={register('diagnosis')}>
                Діагноз
              </Input>
            </div>
            <div className='mt-1.5'>
              <Textarea placeholder='Лікування' name='treatment' id='treatment' obj={register('treatment')} rows={5}>
                Лікування
              </Textarea>
            </div>
            <div className='mt-1.5'>
              <H6>Ліки</H6>

              {medicine && (
                <div className='grid grid-cols-1 gap-4 my-4'>
                  {medicine.map((medicine) => (
                    <MedicineCard key={medicine.medicineName} medicine={medicine} onDelete={onMedicineDelete} />
                  ))}
                </div>
              )}
            </div>

            <div className={twMerge(analyses.length > 0 && 'mt-4')}>
              <SelectMedicineModal
                allowedAction={(medicine) => {
                  setMedicine((state) => [...state, medicine])
                }}
              />
            </div>
          </>
        )}

        <div className='mt-1.5'>
          <Input
            name='reason'
            placeholder='Причина візиту'
            id='reason'
            obj={register('reason', {
              required: {
                value: true,
                message: "Поле обов'язкове"
              },
              minLength: { value: 30, message: 'Причина візиту має бути не менше 30 символів' }
            })}
            disabled={isDoctor}>
            Причина візиту
          </Input>
          {errors?.reason && <P className='text-red text-sm my-1'>{errors.reason.message}</P>}
        </div>

        <div className='mt-1.5 w-full'>
          <label className='block font-regular mb-2'>Оберіть спеціальність лікаря</label>
          <Dropdown
            options={doctorSpecialties}
            onChange={(option) => {
              setSearchQuery(option)
            }}
            defaultValue={searchQuery}
            disabled={isEditMode}
          />
        </div>

        <div className='mt-1.5 w-full'>
          <label className='block font-regular mb-2'>Оберіть лікаря</label>

          <Controller
            name='doctor'
            control={control}
            rules={{ required: 'Оберіть лікаря' }}
            render={({ field, fieldState }) => (
              <>
                <Dropdown
                  options={doctorOptions}
                  onChange={(option) => field.onChange(option)}
                  disabled={!searchQuery || isEditMode}
                  defaultValue={appointment?.doctor.doctorName}
                />
                {fieldState.error && <span style={{ color: 'red' }}>{fieldState.error.message}</span>}
              </>
            )}
          />
        </div>

        <div className='sm:flex sm:justify-between sm:gap-4'>
          <div className='mt-1.5 w-full'>
            <label className='block font-regular mb-2'>Оберіть дату прийому</label>

            <Controller
              name='startTime'
              control={control}
              rules={{ required: 'Оберіть дату' }}
              render={({ field, fieldState }) => (
                <>
                  <DatePicker
                    onChange={(date) => {
                      const formattedDate = dayjs(date).format('YYYY-MM-DD')
                      field.onChange(formattedDate)
                      setSelectedDate(formattedDate)
                    }}
                    showOutsideDays={false}
                    disabled={isDoctor}
                    calendarModalStyles='w-full'
                    initialDate={
                      field.value ??
                      (appointment?.startTime
                        ? dayjs(appointment?.startTime).format('YYYY-MM-DD')
                        : dayjs().format('YYYY-MM-DD'))
                    }
                  />
                  {fieldState.error && <span style={{ color: 'red' }}>{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
          <div className='mt-1.5 w-full'>
            <label className='block font-regular mb-2'>Оберіть час прийому</label>

            <Controller
              name='startTimeHours'
              control={control}
              rules={{ required: 'Оберіть час' }}
              render={({ field, fieldState }) => (
                <>
                  <Dropdown
                    options={timeOptions}
                    onChange={field.onChange}
                    disabled={isDoctor}
                    defaultValue={field.value ?? dayjs(appointment?.startTime).format('HH:mm')}
                  />
                  {fieldState.error && <span style={{ color: 'red' }}>{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>
        <div className='mt-1.5'>
          <Textarea
            placeholder='Причини прийому'
            name='description'
            id='description'
            obj={register('description')}
            rows={5}
            disabled={isDoctor}>
            Причини прийому
          </Textarea>
        </div>

        <div className='mt-1.5'>
          <H6>Аналізи</H6>

          <div className='grid grid-cols-1 gap-4 mt-4'>
            {analyses.map((analysis) => (
              <AnalysesCard key={analysis._id} analysis={analysis} />
            ))}
          </div>
        </div>

        <div className={twMerge(analyses.length > 0 && 'mt-4')}>
          <SelectAnalyzesModal allowedAction={(analyzes) => setAnalyzes(analyzes)} selectedAnalyzes={analyses} />
        </div>

        <div className='my-4'>
          <H6>Додаткові файли</H6>
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
                `appointment_${timestamp}.${extension}`,
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

      <SnackBar />
    </>
  )
}
export default AddEditAppointmentForm
