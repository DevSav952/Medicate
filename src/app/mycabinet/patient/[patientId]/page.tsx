'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import { H2, H4, H6, P } from '@/components/ui/Typography/Typography'
import { useEffect, useMemo, useState } from 'react'
import Tabs from '@/components/ui/Tabs/Tabs'
import Image from 'next/image'
import dayjs from 'dayjs'
import AppointmentCard from '@/components/AppointmentCard/AppointmentCard'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'
import AnalysesCard from '@/components/AnalyzesCard/AnalyzesCard'
import { mockedPayments } from '@/mocks/Payment.mock'
import PaymentCard from '@/components/PaymentCard/PaymentCard'
import EditProfileModal from '@/components/modals/EditProfileModal/EditProfileModal'
import useSWR from 'swr'
import { Patient } from '@/interfaces/Patient.interface'
import { fetcher } from '@/utils/fetcher'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { IAppointment } from '@/interfaces/Appointment.interface'
import { BUCKET_URL } from '@/constants/bucket'
import { Analyses } from '@/interfaces/Analyses.interface'
import { Button } from '@/components/ui/Button/Button'
import { logout } from '@/lib/auth'
import SnackBar from '@/components/ui/SnackBar/SnackBar'

import { FaUser, FaPlus } from 'react-icons/fa'

const TABS_ENUM = {
  APPOINTMENTS: 'appointments',
  ANALYZES: 'analyzes',
  BILLING: 'billing'
}

const AppointmentTab = () => {
  const params = useParams()
  const { patientId } = params

  const { data: appointments } = useSWR<IAppointment[]>(`/api/appointments/patient/${patientId}`, fetcher, {
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
      <div className='mt-6 flex justify-between'>
        <H6>Записатися на прийом</H6>
        <StyledLinkButton href='/appointments/add' className='bg-blue-100'>
          <FaPlus fill='#fff' />
        </StyledLinkButton>
      </div>

      {futureAppointments.length === 0 && pastAppointments.length === 0 && <P>Немає записів на прийом</P>}

      {futureAppointments.length > 0 && (
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

const AnalyzesTab = () => {
  const params = useParams()
  const { patientId } = params

  const { data: analyses } = useSWR<Analyses[]>(`/api/analyses/patient/${patientId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <>
      <div className='mt-6 flex justify-between'>
        <H6>Додати аналіз</H6>
        <StyledLinkButton href='/analyses/add' className='bg-blue-100'>
          <FaPlus fill='#fff' />
        </StyledLinkButton>
      </div>

      {(!analyses || analyses?.length === 0) && <P>Аналізи відсутні</P>}

      {analyses && analyses?.length > 0 && (
        <div className='mt-6'>
          <H6>Аналізи</H6>

          {analyses.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {analyses.map((analysis) => (
                <AnalysesCard key={analysis._id} analysis={analysis} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

const BillingTab = () => {
  const unPayedServices = useMemo(() => mockedPayments.filter((payment) => !payment.paymentMethod), [mockedPayments])
  const payedServices = useMemo(() => mockedPayments.filter((payment) => !!payment.paymentMethod), [mockedPayments])

  return (
    <>
      {unPayedServices.length === 0 && payedServices.length === 0 && <P>Немає записів на прийом</P>}

      {unPayedServices.length > 0 && (
        <div className='mt-6'>
          <H6>Неоплачені послуги</H6>

          {unPayedServices.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {unPayedServices.map((payment) => (
                <PaymentCard key={payment._id} payment={payment} isUnPayed />
              ))}
            </div>
          )}
        </div>
      )}

      {payedServices.length > 0 && (
        <div className='mt-6'>
          <H6>Історія оплат</H6>

          {payedServices.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {payedServices.map((payment) => (
                <PaymentCard key={payment._id} payment={payment} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

const tabs = [
  { id: TABS_ENUM.APPOINTMENTS, label: 'Записи на прийом', content: <AppointmentTab /> },
  { id: TABS_ENUM.ANALYZES, label: 'Аналізи', content: <AnalyzesTab /> },
  { id: TABS_ENUM.BILLING, label: 'Оплата', content: <BillingTab /> }
]

interface PatientProfileProps {
  params: {
    patientId: string
  }
}

const PatientProfile = ({ params }: PatientProfileProps) => {
  const { patientId } = params

  const { data: patientProfile } = useSWR<Patient>(`/api/patient/${patientId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <div className='shadow-custom-right bg-white py-[30px] px-4'>
      <div className='mt-12 flex flex-col items-center justify-center relative lg:mt-6'>
        {patientProfile && <EditProfileModal patient={patientProfile} />}
        {patientProfile?.image ? (
          <Image
            src={`${BUCKET_URL}/custom/avatars/${patientProfile.image}`}
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
        <P className='px-4 line-clamp-2 text-lg font-bold mt-2'>{patientProfile?.userName}</P>
        <div className='w-full'>
          <H2 className='text-lg mb-4 mt-6'>Особисті дані</H2>
          <ul className='flex flex-col gap-3 md:grid md:grid-cols-3 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>Дата народження</P>
              <H6 className='text-lg'>{patientProfile?.dateOfBirth || '-'}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>E-mail</P>
              <H6 className='text-lg'>{patientProfile?.email}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>Номер телефону</P>
              <H6 className='text-lg'>{patientProfile?.phoneNumber || '-'}</H6>
            </li>
          </ul>
        </div>
        <div className='w-full'>
          <H4 className='text-lg mb-4 mt-6'>Сигнальні позначки</H4>
          <ul className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2'>
            <li>
              <P className='mb-1 text-xs'>Група крові</P>
              <P className='font-medium'>{patientProfile?.bloodType || '-'}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Цукровий діабет</P>
              <P className='font-medium'>{patientProfile?.diabetes || 'ні'}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Резус-фактор</P>
              <P className='font-medium'>{patientProfile?.rhFactor || '-'}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Переливання крові</P>
              <P className='font-medium'>{patientProfile?.bloodTransfusion || 'ні'}</P>
            </li>
          </ul>
          <ul className='flex flex-col gap-3 mt-6 md:grid md:grid-cols-2 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>Непереносимість ліків</P>
              <P className='font-medium'>{patientProfile?.intoleranceToMedicines || 'ні'}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Інфекційні захворювання</P>
              <P className='font-medium'>{patientProfile?.infectiousDiseases || 'ні'}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Хірургічні втручання</P>
              <P className='font-medium'>{patientProfile?.surgicalInterventions || 'ні'}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>Алергії</P>
              <P className='font-medium'>{patientProfile?.allergies || 'ні'}</P>
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

interface PatientProfilePageProps {
  params: {
    patientId: string
  }
}

const PatientProfilePage = ({ params }: PatientProfilePageProps) => {
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
          <PatientProfile params={params} />
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
export default PatientProfilePage
