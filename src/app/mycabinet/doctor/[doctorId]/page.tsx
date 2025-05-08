'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import { H2, H6, P } from '@/components/ui/Typography/Typography'
import { useMemo, useState } from 'react'
import Tabs from '@/components/ui/Tabs/Tabs'
import Image from 'next/image'
import { mockedAppointments } from '@/mocks/Appointments.mock'
import DoctorAppointmentCard from '@/components/doctor/DoctorAppointmentCard/DoctorAppointmentCard'
import dayjs from 'dayjs'
import EditDoctorModal from '@/components/modals/EditDoctorModal/EditDoctorModal'

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
  return <P>Календар</P>
}

const tabs = [
  { id: TABS_ENUM.APPOINTMENTS, label: 'Прийоми', content: <AppointmentsTab /> },
  { id: TABS_ENUM.CALENDAR, label: 'Календар', content: <CalendarTab /> }
]

const DoctorProfile = () => {
  const [isAuth, setIsAuth] = useState(true)

  return (
    <div className='shadow-custom-right bg-white py-[30px] px-4'>
      <div className='mt-12 flex flex-col items-center justify-center relative lg:mt-6'>
        <EditDoctorModal />

        {isAuth ? (
          <Image src={userAvatar} width={80} height={80} alt='User avatar' className='w-[80px] h-[80px] rounded-full' />
        ) : (
          <div className='flex items-center justify-center w-[80px] h-[80px] bg-blue-100 rounded-full'>
            <FaUser size={24} fill='#fff' />
          </div>
        )}
        <P className='px-4 line-clamp-2 text-lg font-bold mt-2'>Іван Петренко</P>
        <div className='w-full'>
          <H2 className='text-lg mb-4 mt-6'>Особисті дані</H2>
          <ul className='flex flex-col gap-3 md:grid md:grid-cols-3 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>Cпеціалізація</P>
              <H6 className='text-lg'>Дерматолог</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>E-mail</P>
              <H6 className='text-lg'>test@gmail.com</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>Номер телефону</P>
              <H6 className='text-lg'>0991111111</H6>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const DoctorProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS_ENUM.APPOINTMENTS)

  return (
    <>
      <PageHeading title='Ваш профіль' />
      <Container className='lg:grid lg:grid-cols-[1fr_270px] lg:gap-4 xl:grid-cols-[1fr_320px]'>
        <div className='mb-[30px] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:mb-0'>
          <DoctorProfile />
        </div>
        <div className='lg:col-start-1 lg:col-end-2 lg:row-start-1'>
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </Container>
    </>
  )
}
export default DoctorProfilePage
