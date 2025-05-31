'use client'

import { Button } from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { convertToSubCurrency } from '@/utils/convetToSubcurrency'
import PaymentPage from '@/components/PaymentPage/PaymentPage'
import { IAppointment } from '@/interfaces/Appointment.interface'
import { IPayment } from '@/interfaces/Payment.interface'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

interface PaymentModalProps {
  appointment: IAppointment
  payment: IPayment
}

const PaymentModal = ({ appointment, payment }: PaymentModalProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
          console.log('handle open')
        }}>
        Оплатити
      </Button>
      <Modal isOpen={isOpen} handleClose={() => setOpen(false)} className='bg-[#f7f7f7]'>
        <div className='w-full'>
          <Elements
            stripe={stripePromise}
            options={{
              mode: 'payment',
              amount: convertToSubCurrency(1000),
              currency: 'uah'
            }}>
            <PaymentPage
              amount={1000}
              appointment={appointment}
              payment={payment}
              allowedAction={() => setOpen(false)}
            />
          </Elements>
        </div>
      </Modal>
    </>
  )
}
export default PaymentModal
