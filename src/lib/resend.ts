'use server'

import { Resend } from 'resend'
import { appointmentEmail } from '@/components/emails/AppointmentEmail'
import { AppointmentEmailProps, PaymentSuccessEmail } from '@/interfaces/shared'
import { paymentSuccessEmail } from '@/components/emails/PaymentSuccessEmail'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

type SendAppointmentEmailProps = AppointmentEmailProps & {
  patientEmail: string
}

type SendPaymentSuccessEmailProps = PaymentSuccessEmail & {
  patientEmail: string
}

export const sendAppointmentEmail = async ({
  appointmentId,
  patientName,
  appointmentDate,
  appointmentTime,
  doctorName,
  patientEmail
}: SendAppointmentEmailProps) => {
  await resend.emails.send({
    to: 'densav.devden@gmail.com',
    from: 'BeClinic <onboarding@resend.dev>',
    subject: 'Hello from BeClinic',
    html: appointmentEmail({
      appointmentId,
      patientName,
      appointmentDate,
      appointmentTime,
      doctorName
    })
  })
}

export const sendPaymentSuccessEmail = async ({
  patientName,
  appointmentDate,
  appointmentTime,
  doctorName,
  paymentAmount,
  patientEmail
}: SendPaymentSuccessEmailProps) => {
  await resend.emails.send({
    to: 'densav.devden@gmail.com',
    from: 'BeClinic <onboarding@resend.dev>',
    subject: 'Hello from BeClinic',
    html: paymentSuccessEmail({
      patientName,
      appointmentDate,
      appointmentTime,
      doctorName,
      paymentAmount
    })
  })
}
