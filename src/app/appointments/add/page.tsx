import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import AddEditAppointmentForm from '@/components/forms/AddEditAppointmentForm/AddEditAppointmentForm'

export default function AddAppointmentsPage() {
  return (
    <>
      <PageHeading title='Додати прийом' />
      <Container className=''>
        <AddEditAppointmentForm />
      </Container>
    </>
  )
}
