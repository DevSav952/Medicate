'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { H4, P } from '@/components/ui/Typography/Typography'
import { Analyses } from '@/interfaces/Analyses.interface'
import { fetcher } from '@/utils/fetcher'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import 'dayjs/locale/uk'
import { Container } from '@/components/ui/Container/Container'
import { Separator } from '@/components/ui/Separator/Separator'
import AttachmentPreviewModal from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'

dayjs.locale('uk')

const SingleAnalysesPage = () => {
  const params = useParams()
  const { analysesId } = params

  const { data: analyses } = useSWR<Analyses>(`/api/analys/${analysesId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <>
      <PageHeading title={analyses?.analysisName}>
        <P className='text-white'>
          Дата аналізу: <span className='capitalize'>{dayjs(analyses?.date).format('MMM DD, YYYY')}</span>
        </P>
      </PageHeading>
      <Container>
        <H4 className='mb-2'>Опис аналізу</H4>
        <P>{analyses?.description || '-'}</P>
        <Separator className='bg-[#D1D1D1]' />
        {analyses?.fileName && <AttachmentPreviewModal attachment={analyses.fileName} />}
      </Container>
    </>
  )
}
export default SingleAnalysesPage
