'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { MBlogItem } from '@/mocks/BlogItem.mock'
import BlogItem from '@/components/BlogComponents/BlogItem'
import { Container } from '@/components/ui/Container/Container'
import BlogFilters from '@/components/BlogComponents/BlogFilters'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import { IBlogItem } from '@/interfaces/BlogItem.interface'
import { P } from '@/components/ui/Typography/Typography'

export default function BlogPage() {
  const { data: blog, isLoading } = useSWR<IBlogItem[]>('/api/blog', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <>
      <PageHeading title='Блог' />
      <Container>
        <BlogFilters length={blog?.length ?? 0} />
        <div className='flex flex-col gap-10 max-w-[640px] mx-auto md:grid md:grid-cols-2 md:max-w-[100%]'>
          {blog && blog.length === 0 && !isLoading && <P>Немає статей</P>}

          {blog &&
            blog.length > 0 &&
            blog.map((item, i) => {
              return <BlogItem key={i} item={item} />
            })}
        </div>

        {isLoading && (
          <div className='flex items-center justify-center h-[60vh]'>
            <div className='w-8 h-8 rounded-full border-4 border-[#81DAFB] border-t-transparent animate-spin'></div>
          </div>
        )}
      </Container>
    </>
  )
}
