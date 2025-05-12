'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import { H2, H6, P } from '@/components/ui/Typography/Typography'
import { useEffect, useMemo, useState } from 'react'
import Tabs from '@/components/ui/Tabs/Tabs'
import Image from 'next/image'
import { mockedAppointments } from '@/mocks/Appointments.mock'
import DoctorAppointmentCard from '@/components/doctor/DoctorAppointmentCard/DoctorAppointmentCard'
import dayjs from 'dayjs'
import EditDoctorModal from '@/components/modals/EditDoctorModal/EditDoctorModal'
import { fetcher } from '@/utils/fetcher'
import { Doctor } from '@/interfaces/Doctor.interface'
import useSWR from 'swr'
import { useRouter, useSearchParams } from 'next/navigation'
import Calendar from '@/components/Calendar/Calendar'

import { FaUser } from 'react-icons/fa'
import userAvatar from '@/assets/about-img5.jpg'

const TABS_ENUM = {
  APPOINTMENTS: 'appointments',
  CALENDAR: 'calendar'
}

const AppointmentsTab = () => {
  const futureAppointments = useMemo(
    () => mockedAppointments.filter((appointment) => dayjs(appointment.startTime).isAfter(dayjs())),
    [mockedAppointments]
  )

  const pastAppointments = useMemo(
    () => mockedAppointments.filter((appointment) => dayjs(appointment.startTime).isBefore(dayjs())),
    [mockedAppointments]
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

  const { data: doctorProfile } = useSWR<Doctor>(`/api/doctor/${doctorId}`, fetcher, {
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
          <Image src={userAvatar} width={80} height={80} alt='User avatar' className='w-[80px] h-[80px] rounded-full' />
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
              <H6 className='text-lg'>{doctorProfile?.position}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>E-mail</P>
              <H6 className='text-lg'>{doctorProfile?.email}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>Номер телефону</P>
              <H6 className='text-lg'>{doctorProfile?.phone}</H6>
            </li>
          </ul>
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
    </>
  )
}
export default DoctorProfilePage
