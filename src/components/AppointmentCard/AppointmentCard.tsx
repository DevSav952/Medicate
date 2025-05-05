import { Appointment } from '@/interfaces/Appointment.interface'
import { H6, P } from '@/components/ui/Typography/Typography'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

interface AppointmentCardProps {
  appointment: Appointment
  isIncoming?: boolean
}

const AppointmentCard = ({ appointment, isIncoming }: AppointmentCardProps) => {
  return (
    <div className='flex shadow-custom-right bg-white'>
      <div className={twMerge('w-2 bg-blue-100', isIncoming && 'bg-orange-400')} />
      <div className='py-4 pr-4 pl-3 flex flex-col'>
        <H6 className=''>
          {appointment.doctorName}. {appointment.speciality}
        </H6>
        <P>
          {dayjs(appointment.startTime).format('MMM DD, YYYY HH:mm')} - {dayjs(appointment.endTime).format('HH:mm')}
        </P>
      </div>
    </div>
  )
}
export default AppointmentCard
