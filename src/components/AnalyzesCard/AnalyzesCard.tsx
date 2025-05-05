import { Analyses } from '@/interfaces/Analyses.interface'
import { H6, P } from '@/components/ui/Typography/Typography'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'

dayjs.locale('uk')

interface AnalysesCardProps {
  analysis: Analyses
}

const AnalysesCard = ({ analysis }: AnalysesCardProps) => {
  return (
    <div className='flex shadow-custom-right bg-white'>
      <div className='w-2 bg-blue-100' />
      <div className='py-4 pr-4 pl-3 flex flex-col'>
        <H6>{analysis.analysisName}</H6>
        <P className='capitalize'>{dayjs(analysis.createdAt).locale('uk').format('MMM DD, YYYY HH:mm')}</P>
      </div>
    </div>
  )
}
export default AnalysesCard
