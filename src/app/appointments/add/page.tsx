'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import AddEditAppointmentForm from '@/components/forms/AddEditAppointmentForm/AddEditAppointmentForm'

export default function AddAppointmentsPage() {
  const [date, setDate] = useState<Date>(new Date())

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData) {
      setDate(selectedData)
    }
  }

  return (
    <>
      <PageHeading title='Додати прийом' />
      <Container className=''>
        <AddEditAppointmentForm />
      </Container>
    </>
  )
}
