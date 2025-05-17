import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import AddEditAnalysesForm from '@/components/forms/AddEditAnalysesForm/AddEditAnalysesForm'

const AnalysesAddPage = () => {
  return (
    <>
      <PageHeading title='Додати аналіз' />
      <Container>
        <AddEditAnalysesForm />
      </Container>
    </>
  )
}
export default AnalysesAddPage
