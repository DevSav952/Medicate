import { IBlogItem } from '@/interfaces/BlogItem.interface'
import Image from 'next/image'
import dayjs from 'dayjs'
import { H3, P } from '@/components/ui/Typography/Typography'
import { StyledLink } from '@/components/ui/StyledLink/StyledLink'
import { Separator } from '@/components/ui/Separator/Separator'
import { BUCKET_URL } from '@/constants/bucket'

import { FaCalendarAlt } from 'react-icons/fa'

interface BlogItemProps {
  item: IBlogItem
}

const BlogItem = ({ item }: BlogItemProps) => {
  return (
    <article>
      <Image
        src={`${BUCKET_URL}/custom/files/${item.image}`}
        alt={item.title}
        className='mb-[26px] object-cover w-full h-full max-h-[337px]'
        unoptimized
        width={600}
        height={337}
      />
      <div className='flex flex-col'>
        <div className='flex items-center'>
          <FaCalendarAlt fill='#56b0d2' className='mr-2' />
          <span className='text-[#8f9395] text-sm px-[3px]'>
            {dayjs(item.updatedAt ? item.updatedAt : item.createdAt).format('MMMM D, YYYY')}
          </span>
        </div>
        <H3 className='text-[#949494] mt-[5px]'>{item.title}</H3>
      </div>
      <StyledLink href={`/blog/${item._id}`} className='text-[#56b0d2] underline mt-2'>
        Дізнатися більше
      </StyledLink>
      <Separator className='mt-[30px]' />
    </article>
  )
}
export default BlogItem
