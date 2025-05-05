'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import { H2, H4, H6, P } from '@/components/ui/Typography/Typography'
import { useMemo, useState } from 'react'
import Tabs from '@/components/ui/Tabs/Tabs'
import Image from 'next/image'
import { mockedAppointments } from '@/mocks/Appointments.mock'
import dayjs from 'dayjs'
import AppointmentCard from '@/components/AppointmentCard/AppointmentCard'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'

import { FaUser, FaPlus } from 'react-icons/fa'
import userAvatar from '@/assets/about-img5.jpg'

const TABS_ENUM = {
  APPOINTMENTS: 'appointments',
  TREATMENT: 'treatment',
  ANALYZES: 'analyzes',
  BILLING: 'billing'
}

const AppointmentTab = () => {
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
      <div className='mt-6 flex justify-between'>
        <H6>Записатися на прийом</H6>
        <StyledLinkButton href='/' className='bg-blue-100'>
          <FaPlus fill='#fff' />
        </StyledLinkButton>
      </div>

      {futureAppointments.length === 0 && pastAppointments.length === 0 && <P>Немає записів на прийом</P>}

      {pastAppointments.length > 0 && (
        <div className='mt-6'>
          <H6>Записи на прийом</H6>

          {futureAppointments.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {futureAppointments.map((appointment) => (
                <AppointmentCard key={appointment._id} appointment={appointment} isIncoming />
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
                <AppointmentCard key={appointment._id} appointment={appointment} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

const TreatmentTab = () => {
  return <P>Лікування</P>
}

const AnalyzesTab = () => {
  return <P>Аналізи</P>
}

const BillingTab = () => {
  return <P>Оплата послуг</P>
}

const tabs = [
  { id: TABS_ENUM.APPOINTMENTS, label: 'Записи на прийом', content: <AppointmentTab /> },
  { id: TABS_ENUM.TREATMENT, label: 'Лікування', content: <TreatmentTab /> },
  { id: TABS_ENUM.ANALYZES, label: 'Аналізи', content: <AnalyzesTab /> },
  { id: TABS_ENUM.BILLING, label: 'Оплата', content: <BillingTab /> }
]

const PatientProfile = () => {
  const [isAuth, setIsAuth] = useState(true)

  return (
    <div className='shadow-custom-right bg-white py-[30px] px-4'>
      <div className='mt-12 flex flex-col items-center justify-center lg:mt-6'>
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
              <P className='mb-1 text-xs'>Дата народження</P>
              <H6 className='text-lg'>01.01.2000</H6>
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
        <div className='w-full'>
          <H4 className='text-lg mb-4 mt-6'>Сигнальні позначки</H4>
          <ul className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2'>
            <li>
              <P className='mb-1 text-xs'>Група крові</P>
              <P className='font-medium'>0 (I)</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Цукровий діабет</P>
              <P className='font-medium'>Ні</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Резус-фактор</P>
              <P className='font-medium'>Rh -</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Переливання крові</P>
              <P className='font-medium'>-</P>
            </li>
          </ul>
          <ul className='flex flex-col gap-3 mt-6 md:grid md:grid-cols-2 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>Непереносимість ліків</P>
              <P className='font-medium'>ні</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Інфекційні захворювання</P>
              <P className='font-medium'>ні</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Хірургічні втручання</P>
              <P className='font-medium'>ні</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Алергії</P>
              <P className='font-medium'>ні</P>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const PatientProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS_ENUM.APPOINTMENTS)
  return (
    <>
      <PageHeading title='Ваш профіль' />
      <Container className='lg:grid lg:grid-cols-[1fr_270px] lg:gap-4 xl:grid-cols-[1fr_320px]'>
        <div className='mb-[30px] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:mb-0'>
          <PatientProfile />
        </div>
        <div className='lg:col-start-1 lg:col-end-2 lg:row-start-1'>
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </Container>
    </>
  )
}
export default PatientProfilePage
