'use client'

import Calendar from '@/components/Calendar/Calendar'
import DoctorAppointmentCard from '@/components/doctor/DoctorAppointmentCard/DoctorAppointmentCard'
import EditDoctorModal from '@/components/modals/EditDoctorModal/EditDoctorModal'
import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import Tabs from '@/components/ui/Tabs/Tabs'
import { H2, H6, P } from '@/components/ui/Typography/Typography'
import { Doctor } from '@/interfaces/Doctor.interface'
import { fetcher } from '@/utils/fetcher'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { IAppointment } from '@/interfaces/Appointment.interface'
import { BUCKET_URL } from '@/constants/bucket'
import { Button } from '@/components/ui/Button/Button'
import { logout } from '@/lib/auth'
import SnackBar from '@/components/ui/SnackBar/SnackBar'

import { FaUser } from 'react-icons/fa'

const TABS_ENUM = {
  APPOINTMENTS: 'appointments',
  CALENDAR: 'calendar'
}

const AppointmentsTab = () => {
  const params = useParams()
  const { doctorId } = params

  const { data: appointments } = useSWR<IAppointment[]>(`/api/appointments/doctor/${doctorId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  const futureAppointments = useMemo(
    () => appointments?.filter((appointment) => dayjs(appointment.endTime).isAfter(dayjs())) || [],
    [appointments]
  )

  const pastAppointments = useMemo(
    () => appointments?.filter((appointment) => dayjs(appointment.endTime).isBefore(dayjs())) || [],
    [appointments]
  )

  return (
    <>
      {futureAppointments.length === 0 && pastAppointments.length === 0 && <P>Немає записів на прийом</P>}

      {futureAppointments.length > 0 && (
        <div className='mt-6'>
          <H6>Майбутні прийоми</H6>

          {futureAppointments.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {futureAppointments.map((appointment) => (
                <DoctorAppointmentCard key={appointment._id} appointment={appointment} isIncoming />
              ))}
            </div>
          )}
        </div>
      )}

      {pastAppointments.length > 0 && (
        <div className='mt-6'>
          <H6>Попередні прийоми</H6>

          {pastAppointments.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {pastAppointments.map((appointment) => (
                <DoctorAppointmentCard key={appointment._id} appointment={appointment} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

const CalendarTab = () => {
  return (
    <>
      <Calendar />
    </>
  )
}

const tabs = [
  { id: TABS_ENUM.APPOINTMENTS, label: 'Прийоми', content: <AppointmentsTab /> },
  { id: TABS_ENUM.CALENDAR, label: 'Календар', content: <CalendarTab /> }
]

interface DoctorProfileProps {
  params: {
    doctorId: string
  }
}

const DoctorProfile = ({ params }: DoctorProfileProps) => {
  const { doctorId } = params

  const { data: doctorProfile } = useSWR<Doctor>(`/api/myProfile/doctor/${doctorId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <div className='shadow-custom-right bg-white py-[30px] px-4'>
      <div className='mt-12 flex flex-col items-center justify-center relative lg:mt-6'>
        {doctorProfile && <EditDoctorModal doctor={doctorProfile} />}

        {doctorProfile?.image ? (
          <Image
            src={`${BUCKET_URL}/custom/avatars/${doctorProfile.image}`}
            width={80}
            height={80}
            alt='User avatar'
            unoptimized
            className='w-[80px] h-[80px] rounded-full'
          />
        ) : (
          <div className='flex items-center justify-center w-[80px] h-[80px] bg-blue-100 rounded-full'>
            <FaUser size={24} fill='#fff' />
          </div>
        )}
        <P className='px-4 line-clamp-2 text-lg font-bold mt-2'>{doctorProfile?.doctorName}</P>
        <div className='w-full'>
          <H2 className='text-lg mb-4 mt-6'>Особисті дані</H2>
          <ul className='flex flex-col gap-3 md:grid md:grid-cols-3 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>Cпеціалізація</P>
              <H6 className='text-lg'>{doctorProfile?.position || '-'}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>E-mail</P>
              <H6 className='text-lg'>{doctorProfile?.email || '-'}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>Номер телефону</P>
              <H6 className='text-lg'>{doctorProfile?.phone || '-'}</H6>
            </li>
          </ul>
        </div>
        <div className='w-full'>
          <Button className='mt-8 bg-red' onClick={() => logout()}>
            Вийти з акаунту
          </Button>
        </div>
      </div>
    </div>
  )
}

interface DoctorProfilePageProps {
  params: {
    doctorId: string
  }
}

const DoctorProfilePage = ({ params }: DoctorProfilePageProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get('tab') ?? TABS_ENUM.APPOINTMENTS
  const [activeTab, setActiveTab] = useState<string>(tab)

  useEffect(() => {
    setActiveTab(tab)
  }, [tab])

  return (
    <>
      <PageHeading title='Ваш профіль' />
      <Container className='lg:grid lg:grid-cols-[1fr_270px] lg:gap-4 xl:grid-cols-[1fr_320px]'>
        <div className='mb-[30px] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:mb-0'>
          <DoctorProfile params={params} />
        </div>
        <div className='lg:col-start-1 lg:col-end-2 lg:row-start-1'>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab)
              router.push(`?tab=${tab}`)
            }}
          />
        </div>
      </Container>

      <SnackBar />
    </>
  )
}
export default DoctorProfilePage
