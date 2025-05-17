import { H6, P } from '@/components/ui/Typography/Typography'
import { EventApi } from '@fullcalendar/core/index.js'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

dayjs.locale('uk')

interface CalendarAppointmentCardProps {
  event: EventApi
}

const CalendarAppointmentCard = ({ event }: CalendarAppointmentCardProps) => {
  return (
    <Link href={`/appointments/${event.id}`}>
      <div className='flex shadow-custom-right bg-white'>
        <div className={twMerge('w-2 bg-orange-400')} />
        <div className='py-4 pr-4 pl-3 flex flex-col'>
          <H6>{event.title}.</H6>
          <P className='capitalize'>
            {dayjs(event.start).format('MMM DD, YYYY HH:mm')} - {dayjs(event.end).format('HH:mm')}
          </P>
        </div>
      </div>
    </Link>
  )
}
export default CalendarAppointmentCard
