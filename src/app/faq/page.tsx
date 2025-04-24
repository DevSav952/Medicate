import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import { H1, P } from '@/components/ui/Typography/Typography'
import { MFaqs } from '@/mocks/Faqs.mock'
import FaqItem from '@/components/FaqItem/FaqItem'

export default function Faq() {
  return (
    <>
      <PageHeading title='ЧАПи' />
      <Container>
        <div className='max-w-[945px] mx-auto'>
          <H1 className='mb-5 text-center'>ЧАПи</H1>
          <P className='text-center'>
            Розділ Часті запитання (FAQ) — це ваша перша зупинка для швидких і зрозумілих відповідей на найпоширеніші
            питання наших пацієнтів. Тут ви знайдете актуальну інформацію про:
          </P>
        </div>
        {MFaqs.map((item, i) => {
          return <FaqItem key={i} item={item} />
        })}
      </Container>
    </>
  )
}
