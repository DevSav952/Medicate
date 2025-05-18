'use client'

import { fetcher } from '@/utils/fetcher'
import { useParams } from 'next/navigation'
import { IAppointment } from '@/interfaces/Appointment.interface'
import useSWR from 'swr'
import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import { H4, P } from '@/components/ui/Typography/Typography'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'
import { Separator } from '@/components/ui/Separator/Separator'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'
import MedicineCard from '@/components/MedicineCard/MedicineCard'
import AnalysesCard from '@/components/AnalyzesCard/AnalyzesCard'
import { mockedMedicine } from '@/mocks/Medicine.mock'

dayjs.locale('uk')

const UpcomingAppointment = ({ appointmentData }: { appointmentData: IAppointment }) => {
  return (
    <>
      <div className='flex justify-between'>
        <div>
          <H4>Медичний центр</H4>
          <P>Вінниця</P>
        </div>
        <div>
          <StyledLinkButton
            href='/contacts'
            target='_blank'
            className='p-2 bg-blue-100 text-white normal-case tracking-normal mt-1'>
            Подивитись на карті
          </StyledLinkButton>
        </div>
      </div>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>Причина візиту</H4>
      <P>{appointmentData?.reason || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>Додаткові деталі</H4>
      <P>{appointmentData?.description || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>Аналізи</H4>
      <div className='flex flex-col gap-4'>
        {appointmentData?.analyzes && appointmentData.analyzes.length > 0 ? (
          appointmentData.analyzes.map((analysis) => <AnalysesCard key={analysis._id} analysis={analysis} />)
        ) : (
          <P>-</P>
        )}
      </div>
    </>
  )
}

const PastAppointment = ({ appointmentData }: { appointmentData: IAppointment }) => {
  return (
    <>
      <H4 className='mb-2'>Причина візиту</H4>
      <P>{appointmentData?.reason || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>Додаткові деталі</H4>
      <P>{appointmentData?.description || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>Аналізи</H4>
      <div className='flex flex-col gap-4'>
        {appointmentData?.analyzes?.map((analysis) => <AnalysesCard key={analysis._id} analysis={analysis} />)}
        {appointmentData?.analyzes?.length === 0 && <P>-</P>}
      </div>

      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>Діагноз</H4>
      <P>{appointmentData?.diagnosis || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>Призначені препарати</H4>
      <div className='flex flex-col gap-4'>
        <div className='px-4 w-full grid gap-4 grid-cols-[100px_75px_1fr] sm:grid-cols-[100px_100px_1fr]'>
          <P className='text-xs'>Препарат</P>
          <P className='text-xs'>Приймати, днів</P>
          <P className='text-xs'>Коментар</P>
        </div>
        {appointmentData?.analyzes && appointmentData.analyzes.length > 0 ? (
          appointmentData.analyzes.map((analysis) => <AnalysesCard key={analysis._id} analysis={analysis} />)
        ) : (
          <P>-</P>
        )}
      </div>
      <Separator className='bg-[#D1D1D1]' />

      <H4>Коментар лікаря</H4>
      <P>{appointmentData?.treatment || '-'}</P>
    </>
  )
}

const SingleAppointmentPage = () => {
  const params = useParams()
  const { appointmentId } = params
  const currentTime = dayjs()

  const { data: appointmentData } = useSWR<IAppointment>(`/api/appointment/${appointmentId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <>
      <PageHeading title={`Візит до ${appointmentData?.doctor?.position}a `}>
        <P className='text-white capitalize'>Лікар: {appointmentData?.doctor.doctorName}</P>
        <P className='text-white capitalize'>
          Дата візиту: {dayjs(appointmentData?.startTime).format('MMM DD, YYYY HH:mm')} -{' '}
          {dayjs(appointmentData?.endTime).format('HH:mm')}
        </P>
      </PageHeading>
      <Container>
        {dayjs(appointmentData?.endTime).isAfter(currentTime) && appointmentData && (
          <UpcomingAppointment appointmentData={appointmentData} />
        )}

        {dayjs(appointmentData?.endTime).isBefore(currentTime) && appointmentData && (
          <PastAppointment appointmentData={appointmentData} />
        )}
      </Container>
    </>
  )
}
export default SingleAppointmentPage
