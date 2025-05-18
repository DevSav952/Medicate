'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import AddEditAnalysesForm from '@/components/forms/AddEditAnalysesForm/AddEditAnalysesForm'
import { Analyses } from '@/interfaces/Analyses.interface'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { useParams } from 'next/navigation'

const AnalysesAddPage = () => {
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
      <PageHeading title='Змінити аналіз' />
      <Container>{analyses && <AddEditAnalysesForm analyses={analyses} />}</Container>
    </>
  )
}
export default AnalysesAddPage
