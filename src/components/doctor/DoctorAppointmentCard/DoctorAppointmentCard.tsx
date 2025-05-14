import { IAppointment } from '@/interfaces/Appointment.interface'
import { H6, P } from '@/components/ui/Typography/Typography'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import 'dayjs/locale/uk'

dayjs.locale('uk')

interface DoctorAppointmentCardProps {
  appointment: IAppointment
  isIncoming?: boolean
}

const DoctorAppointmentCard = ({ appointment, isIncoming }: DoctorAppointmentCardProps) => {
  return (
    <div className='flex shadow-custom-right bg-white'>
      <div className={twMerge('w-2 bg-blue-100', isIncoming && 'bg-orange-400')} />
      <div className='py-4 pr-4 pl-3 flex flex-col'>
        <H6>{appointment.patient.patientName}</H6>
        <P className='capitalize'>
          {dayjs(appointment.startTime).format('MMM DD, YYYY HH:mm')} - {dayjs(appointment.endTime).format('HH:mm')}
        </P>
      </div>
    </div>
  )
}
export default DoctorAppointmentCard
