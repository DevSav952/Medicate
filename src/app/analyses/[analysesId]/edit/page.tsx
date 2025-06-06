'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import AddEditAnalysesForm from '@/components/forms/AddEditAnalysesForm/AddEditAnalysesForm'
import { Analyses } from '@/interfaces/Analyses.interface'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { useParams } from 'next/navigation'

const AnalysesEditPage = () => {
  const params = useParams()
  const { analysesId } = params

  const { data: analyses, isLoading } = useSWR<Analyses>(`/api/analys/${analysesId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <>
      <PageHeading title='Змінити аналіз' />
      <Container>{analyses && <AddEditAnalysesForm analyses={analyses} />}</Container>

      {isLoading && (
        <div className='flex items-center justify-center h-[40vh]'>
          <div className='w-8 h-8 rounded-full border-4 border-[#81DAFB] border-t-transparent animate-spin'></div>
        </div>
      )}
    </>
  )
}
export default AnalysesEditPage
