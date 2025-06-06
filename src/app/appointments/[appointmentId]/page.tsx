'use client'

import { fetcher } from '@/utils/fetcher'
import { useParams, useRouter } from 'next/navigation'
import { IAppointment } from '@/interfaces/Appointment.interface'
import useSWR from 'swr'
import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import { H2, H4, P } from '@/components/ui/Typography/Typography'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'
import { Separator } from '@/components/ui/Separator/Separator'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'
import MedicineCard from '@/components/MedicineCard/MedicineCard'
import AnalysesCard from '@/components/AnalyzesCard/AnalyzesCard'
import AttachmentPreviewModal from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { SkeletonText } from '@/components/ui/Skeletons/Skeletons'

import { MdEdit } from 'react-icons/md'

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

      {appointmentData?.fileName && (
        <>
          <Separator className='bg-[#D1D1D1]' />
          <H4 className='mb-2'>Додаткові файли</H4>
          <AttachmentPreviewModal attachment={appointmentData.fileName} />
        </>
      )}

      {appointmentData.treatment && (
        <>
          <Separator className='bg-[#D1D1D1]' />
          <H4 className='mb-2'>Діагноз</H4>
          <P>{appointmentData?.diagnosis || '-'}</P>{' '}
        </>
      )}

      {appointmentData.treatment && (
        <>
          <Separator className='bg-[#D1D1D1]' />
          <H4>Коментар лікаря</H4>
          <P>{appointmentData?.treatment || '-'}</P>{' '}
        </>
      )}
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
        {appointmentData?.medicine && appointmentData.medicine.length > 0 ? (
          appointmentData.medicine.map((medicine) => <MedicineCard key={medicine.medicineName} medicine={medicine} />)
        ) : (
          <P>-</P>
        )}
      </div>
      <Separator className='bg-[#D1D1D1]' />

      {appointmentData?.fileName && <AttachmentPreviewModal attachment={appointmentData.fileName} />}

      <H4>Коментар лікаря</H4>
      <P>{appointmentData?.treatment || '-'}</P>
    </>
  )
}

const SingleAppointmentPage = () => {
  const params = useParams()
  const { appointmentId } = params
  const currentTime = dayjs()
  const router = useRouter()

  const { data: appointmentData, isLoading } = useSWR<IAppointment>(`/api/appointment/${appointmentId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <>
      <PageHeading title=''>
        {isLoading ? (
          <SkeletonText className='h-10 mb-2.5 mt-5.5 w-[270px] bg-white opacity-10' />
        ) : (
          <H2 className='text-white mt-4 mb-1'>{`Візит до ${appointmentData?.doctor?.position}a`}</H2>
        )}

        <div className='flex items-center w-full justify-between'>
          <div>
            {isLoading ? (
              <SkeletonText className='h-4 mb-1 w-[240px] bg-white opacity-10' />
            ) : (
              <P className='text-white capitalize'>Лікар: {appointmentData?.doctor.doctorName}</P>
            )}

            {isLoading ? (
              <SkeletonText className='h-4 mb-1 w-[270px] bg-white opacity-10' />
            ) : (
              <P className='text-white'>
                Дата візиту:{' '}
                <span className='capitalize'>
                  {dayjs(appointmentData?.startTime).format('MMM DD, YYYY HH:mm')} -{' '}
                  {dayjs(appointmentData?.endTime).format('HH:mm')}
                </span>
              </P>
            )}
          </div>

          <div className='flex gap-4 text-white'>
            {dayjs(appointmentData?.endTime).isAfter(currentTime) && !isLoading && (
              <MdEdit
                className='transition-all duration-300 hover:text-orange-400 cursor-pointer'
                onClick={() => {
                  router.push(`/appointments/${appointmentData?._id}/edit`)
                }}
              />
            )}
          </div>
        </div>
      </PageHeading>
      <Container>
        {dayjs(appointmentData?.endTime).isAfter(currentTime) && appointmentData && !isLoading && (
          <UpcomingAppointment appointmentData={appointmentData} />
        )}

        {dayjs(appointmentData?.endTime).isBefore(currentTime) && appointmentData && !isLoading && (
          <PastAppointment appointmentData={appointmentData} />
        )}

        {isLoading && (
          <div className='flex items-center justify-center h-[60vh]'>
            <div className='w-8 h-8 rounded-full border-4 border-[#81DAFB] border-t-transparent animate-spin'></div>
          </div>
        )}
      </Container>
    </>
  )
}
export default SingleAppointmentPage
