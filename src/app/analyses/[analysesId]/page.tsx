'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { H4, P } from '@/components/ui/Typography/Typography'
import { Analyses } from '@/interfaces/Analyses.interface'
import { fetcher } from '@/utils/fetcher'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import 'dayjs/locale/uk'
import { Container } from '@/components/ui/Container/Container'
import { Separator } from '@/components/ui/Separator/Separator'
import AttachmentPreviewModal from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'

import { MdEdit } from 'react-icons/md'

dayjs.locale('uk')

const SingleAnalysesPage = () => {
  const params = useParams()
  const { analysesId } = params
  const router = useRouter()

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
        <div className='flex items-center w-full justify-between'>
          <P className='text-white'>
            Дата аналізу: <span className='capitalize'>{dayjs(analyses?.date).format('MMM DD, YYYY')}</span>
          </P>
          <div className='flex gap-4 text-white'>
            <MdEdit
              className='transition-all duration-300 hover:text-orange-400 cursor-pointer'
              onClick={() => {
                router.push(`/analyses/${analysesId}/edit`)
              }}
            />
          </div>
        </div>
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
