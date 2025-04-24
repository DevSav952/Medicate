import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import { H1, H2, P } from '@/components/ui/Typography/Typography'
import { MFaqs } from '@/mocks/Faqs.mock'
import { Separator } from '@/components/ui/Separator/Separator'
import { Ul, UlItem } from '@/components/ui/List/List'

interface FaqItem {
  question: string
  answer?: string
  list?: string[]
  listTitle?: string
}

interface FaqItemProps {
  item: FaqItem
}

export const FaqItem = ({ item }: FaqItemProps) => {
  return (
    <>
      <Separator />
      <div className='py-2.5'>
        <H2 className='text-[24px] mb-2.5'>{item.question}</H2>

        {item.answer && (
          <P className='mt-3'>
            <span className='text-[#42474c] font-primary text-[24px] mr-[5px] font-bold'>В:</span>
            {item.answer}
          </P>
        )}

        {item.listTitle && <P className='my-5'>{item.listTitle}</P>}
        {item.list && (
          <Ul>
            {item.list.map((item, i) => {
              return (
                <UlItem className='italic' key={i}>
                  {item}
                </UlItem>
              )
            })}
          </Ul>
        )}
      </div>
    </>
  )
}

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
