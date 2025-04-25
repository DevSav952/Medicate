import { H2, P } from '@/components/ui/Typography/Typography'
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
