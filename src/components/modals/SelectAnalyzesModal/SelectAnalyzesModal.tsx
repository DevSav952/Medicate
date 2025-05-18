'use client'

import { Modal } from '@/components/ui/Modal/Modal'
import { H6, P } from '@/components/ui/Typography/Typography'
import { Analyses } from '@/interfaces/Analyses.interface'
import { Session } from '@/interfaces/Session.interface'
import { getSession } from '@/lib/auth'
import { fetcher } from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Button } from '@/components/ui/Button/Button'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'

import { TiTick } from 'react-icons/ti'

dayjs.locale('uk')

interface CustomAnalyzesCardProps {
  analysis: Analyses
  onSelect: () => void
  selected: boolean
}

const AnalysesCard = ({ analysis, onSelect, selected }: CustomAnalyzesCardProps) => (
  <div className='flex shadow-custom-right bg-white relative cursor-pointer' onClick={onSelect}>
    <div className='w-2 bg-blue-100' />
    <div className='py-4 pr-4 pl-3 flex flex-col'>
      <H6>{analysis.analysisName}</H6>
      <P className='capitalize'>{dayjs(analysis.date).locale('uk').format('MMM DD, YYYY')}</P>
    </div>

    {selected && (
      <div className='absolute top-0 right-5 w-5 h-5 bg-green-600 flex items-center justify-center shadow-md'>
        <TiTick className='fill-white' />
      </div>
    )}
  </div>
)

interface SelectAnalyzesModalProps {
  selectedAnalyzes: Analyses[]
  allowedAction: (selectedData: Analyses[]) => void
}

const SelectAnalyzesModal = ({ allowedAction, selectedAnalyzes }: SelectAnalyzesModalProps) => {
  const [isOpen, setOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [selectedData, setSelectedData] = useState<Analyses[]>(selectedAnalyzes || [])

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)
    })
  }, [])

  const { data: analyses } = useSWR<Analyses[]>(session?.id && `/api/analyses/patient/${session?.id}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  const handleSelectItem = (analyses: Analyses) => {
    const isSelected = selectedData.find((item) => item._id === analyses._id)

    if (isSelected) {
      setSelectedData(selectedData.filter((item) => item._id !== analyses._id))
    } else {
      setSelectedData([...selectedData, analyses])
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className='border border-solid'>
        Додати аналіз
      </Button>
      <Modal isOpen={isOpen} handleClose={() => setOpen(false)} className='bg-[#f7f7f7]'>
        <div className='flex flex-col w-full'>
          {analyses && analyses?.length > 0 && (
            <div className='mb-4 w-full h-[250px] overflow-y-auto'>
              <H6>Аналізи</H6>

              {analyses.length > 0 && (
                <div className='grid grid-cols-1 gap-4 mt-4'>
                  {analyses.map((analysis) => (
                    <AnalysesCard
                      key={analysis._id}
                      analysis={analysis}
                      onSelect={() => handleSelectItem(analysis)}
                      selected={selectedData.some((item) => item._id === analysis._id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <Button
            onClick={() => {
              allowedAction(selectedData)
              setOpen(false)
            }}
            className='border border-solid'>
            Зберегти
          </Button>
        </div>
      </Modal>
    </>
  )
}
export default SelectAnalyzesModal
