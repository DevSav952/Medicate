import PageHeading from '@/components/PageHeading/PageHeading'
import { MBlogItem } from '@/mocks/BlogItem.mock'
import BlogItem from '@/components/BlogComponents/BlogItem'
import { Container } from '@/components/ui/Container/Container'
import BlogFilters from '@/components/BlogComponents/BlogFilters'

export default function BlogPage() {
  return (
    <>
      <PageHeading title='Блог' />
      <Container>
        <BlogFilters length={MBlogItem.length} />
        <div className='flex flex-col gap-10 max-w-[640px] mx-auto md:grid md:grid-cols-2 md:max-w-[100%]'>
          {MBlogItem.map((item, i) => {
            return <BlogItem key={i} item={item} />
          })}
        </div>
      </Container>
    </>
  )
}
