import { IPayment } from '@/interfaces/Payment.interface'
import { H6, P } from '@/components/ui/Typography/Typography'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'
import { twMerge } from 'tailwind-merge'
import PaymentModal from '@/components/modals/PaymentModal/PaymentModal'

dayjs.locale('uk')

interface PaymentCardProps {
  payment: IPayment
  isUnPayed?: boolean
}

const PaymentCard = ({ payment, isUnPayed }: PaymentCardProps) => {
  return (
    <div className='flex shadow-custom-right bg-white w-full'>
      <div className={twMerge('w-2 bg-blue-100', isUnPayed && 'bg-orange-400')} />
      <div className='py-4 pr-4 pl-3 flex flex-col w-full'>
        <H6>
          Оплата: Візит до {payment.appointment.doctor.position}a {payment.appointment.doctor.doctorName}
        </H6>
        <P className='capitalize'>{dayjs(payment.createdAt).locale('uk').format('MMM DD, YYYY HH:mm')}</P>
        {payment.isPayed ? (
          <P>Оплачено</P>
        ) : (
          <div className='flex items-center justify-between w-full'>
            <P>До сплати: {payment.amount}</P>
            <PaymentModal appointment={payment.appointment} payment={payment} />
          </div>
        )}
      </div>
    </div>
  )
}
export default PaymentCard
