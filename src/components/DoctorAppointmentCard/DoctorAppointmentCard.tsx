import { Appointment } from '@/interfaces/Appointment.interface'
import { H6, P } from '@/components/ui/Typography/Typography'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import 'dayjs/locale/uk'
import Link from 'next/link'

dayjs.locale('uk')

interface DoctorAppointmentCardProps {
  appointment: Appointment
}

const DoctorAppointmentCard = ({ appointment }: DoctorAppointmentCardProps) => {
  return (
    <Link href={`/appointments/${appointment._id}`}>
      <div className='flex shadow-custom-right bg-white'>
        <div className={twMerge('w-2 bg-orange-400')} />
        <div className='py-4 pr-4 pl-3 flex flex-col'>
          <H6>
            {appointment.patientName}. {appointment.speciality}
          </H6>
          <P className='capitalize'>
            {dayjs(appointment.startTime).format('MMM DD, YYYY HH:mm')} - {dayjs(appointment.endTime).format('HH:mm')}
          </P>
        </div>
      </div>
    </Link>
  )
}
export default DoctorAppointmentCard
