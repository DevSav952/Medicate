'use client'

import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import AddEditAppointmentForm from '@/components/forms/AddEditAppointmentForm/AddEditAppointmentForm'
import { useParams } from 'next/navigation'
import { IAppointment } from '@/interfaces/Appointment.interface'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

export default function EditAppointmentsPage() {
  const params = useParams()
  const { appointmentId } = params

  const { data: appointment } = useSWR<IAppointment>(`/api/appointment/${appointmentId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <>
      <PageHeading title='Редагувати прийом' />
      <Container>{appointment && <AddEditAppointmentForm appointment={appointment} />}</Container>
    </>
  )
}
