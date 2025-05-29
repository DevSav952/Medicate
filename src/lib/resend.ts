'use server'

import { Resend } from 'resend'
import { appointmentEmail } from '@/components/emails/AppointmentEmail'
import { AppointmentEmailProps } from '@/interfaces/shared'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

type SendAppointmentEmailProps = AppointmentEmailProps & {
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
