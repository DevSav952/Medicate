'use client'

import { useEffect, useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { convertToSubCurrency } from '@/utils/convetToSubcurrency'
import { Button } from '@/components/ui/Button/Button'
import { P } from '@/components/ui/Typography/Typography'
import { getSession } from '@/lib/auth'
import { Session } from '@/interfaces/Session.interface'
import { sendPaymentSuccessEmail } from '@/lib/resend'
import { IAppointment } from '@/interfaces/Appointment.interface'
import dayjs from 'dayjs'
import { updatePayment } from '@/lib/payments'
import { IPayment } from '@/interfaces/Payment.interface'
import { mutate } from 'swr'

interface PaymentPageProps {
  payment: IPayment
  appointment: IAppointment
  amount: number
  allowedAction: () => void
}

const PaymentPage = ({ amount, appointment, payment, allowedAction }: PaymentPageProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)
    })
  }, [])

  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [amount])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) return

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false)
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setErrorMessage('CardElement not found')
      setLoading(false)
      return
    }

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: 'Customer Name' }
      }
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      await updatePayment({
        ...payment,
        isPayed: true
      })

      await sendPaymentSuccessEmail({
        patientName: session?.userName ?? '',
        appointmentDate: dayjs(appointment.startTime).format('YYYY-MM-DD'),
        appointmentTime: dayjs(appointment.startTime).format('HH:MM'),
        doctorName: appointment.doctor.doctorName,
        paymentAmount: amount,
        patientEmail: session?.email ?? ''
      })
    }

    setLoading(false)
    mutate(`/api/payments/patient/${session?.id}`)
    allowedAction()
  }

  return (
    <>
      {!clientSecret || !stripe || !elements ? (
        <div className='flex items-center justify-center'>
          <div
            className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]'
            role='status'>
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='p-2 mt-2'>
          <div className='mb-4'>
            {clientSecret && (
              <div className='bg-white p-6 shadow-custom-right'>
                <CardElement />
              </div>
            )}
            {errorMessage && <P className='text-red'>{errorMessage}</P>}
          </div>
          <Button
            type='submit'
            className='w-full text-white p-3 bg-black rounded-md font-bold disabled:opacity-50 disabled:animate-pulse mt-6'>
            {!loading ? `Оплатити ₴${amount}` : 'Обробка платежу...'}
          </Button>
        </form>
      )}
    </>
  )
}
export default PaymentPage
