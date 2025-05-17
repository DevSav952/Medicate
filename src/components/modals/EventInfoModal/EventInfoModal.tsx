import { Modal } from '@/components/ui/Modal/Modal'
import { IAppointment } from '@/interfaces/Appointment.interface'
import { H6, P } from '@/components/ui/Typography/Typography'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'
import Link from 'next/link'

dayjs.locale('uk')

interface EventInfoModalProps {
  isOpen: boolean
  event: IAppointment
  handleClose: () => void
}

const EventInfoModal = ({ isOpen, handleClose, event }: EventInfoModalProps) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className=''>
      <div className='flex flex-col w-full '>
        <H6>{event.patient.userName}</H6>
        <P className='capitalize'>
          {dayjs(event.startTime).format('MMM DD, YYYY HH:mm')} - {dayjs(event.endTime).format('HH:mm')}
        </P>
        <P>{event.reason}</P>
        <P>{event.description}</P>
        <div className='mt-4 flex'>
          <Link href={`/appointments/${event._id}`} className='text-white bg-blue-100 px-2.5 py-1.5 rounded block'>
            До візиту
          </Link>
        </div>
      </div>
    </Modal>
  )
}
export default EventInfoModal
