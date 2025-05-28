'use client'

import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import AddEditAppointmentForm from '@/components/forms/AddEditAppointmentForm/AddEditAppointmentForm'
import { useEffect, useState } from 'react'
import { Session } from '@/interfaces/Session.interface'
import { getSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function AddAppointmentsPage() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)

      const isDoctor = session?.role === 'doctor'
      if (isDoctor) {
        router.replace('/not-found')
      }
    })
  }, [])

  return (
    <>
      <PageHeading title='Додати прийом' />
      <Container>{session && <AddEditAppointmentForm session={session} />}</Container>
    </>
  )
}
