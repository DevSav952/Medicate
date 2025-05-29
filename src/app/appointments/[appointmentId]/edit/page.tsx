'use client'

import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import AddEditAppointmentForm from '@/components/forms/AddEditAppointmentForm/AddEditAppointmentForm'
import { useParams } from 'next/navigation'
import { IAppointment } from '@/interfaces/Appointment.interface'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import { getSession } from '@/lib/auth'
import { Session } from '@/interfaces/Session.interface'

export default function EditAppointmentsPage() {
  const params = useParams()
  const { appointmentId } = params
  const [session, setSession] = useState<Session | null>(null)

  const { data: appointment } = useSWR<IAppointment>(`/api/appointment/${appointmentId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  useEffect(() => {
    getSession().then((session) => {
      if (session.role) {
        setSession(session)
      }
    })
  }, [])

  return (
    <>
      <PageHeading title='Редагувати прийом' />
      <Container>
        {appointment && session && <AddEditAppointmentForm appointment={appointment} session={session} />}
      </Container>
    </>
  )
}
