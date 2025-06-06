import Markdown from 'markdown-to-jsx'
import { Suspense } from 'react'
import { getMarkdownFromS3 } from '@/lib/blog-files'
import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import { getBlogById } from '@/lib/blog'
import Image from 'next/image'
import { BUCKET_URL } from '@/constants/bucket'
import { H1 } from '@/components/ui/Typography/Typography'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'
import { getSession } from '@/lib/auth'

import { MdModeEdit } from 'react-icons/md'

interface ContentProps {
  blogId: string
}

async function Content({ blogId }: ContentProps) {
  const blog = await getBlogById(blogId)
  const post = await getMarkdownFromS3(blog?.description ?? '')
  const session = await getSession()

  return (
    <Suspense>
      <PageHeading title={''}>
        <div className='flex items-center justify-between'>
          <H1 className='text-white mt-4 mb-1 text-[36px]'>{blog?.title}</H1>
          <div>
            {session?.id === blog?.authorId.toString() && (
              <StyledLinkButton variant='outline' className='border-none p-0' href={`/blog/${blog?._id}/edit`}>
                <MdModeEdit size={16} />
              </StyledLinkButton>
            )}
          </div>
        </div>
      </PageHeading>

      <Container>
        <article className='markdown-body'>
          <Image
            src={`${BUCKET_URL}/custom/files/${blog?.image}`}
            alt='doctor'
            unoptimized
            className='w-full h-full max-h-[440px] mb-10 object-cover'
            width={730}
            height={440}
          />

          <Markdown>{post.content}</Markdown>
        </article>
      </Container>
    </Suspense>
  )
}

interface SingleBlogPageParams {
  params: {
    blogId: string
  }
}

export default function SingleBlogPage({ params }: SingleBlogPageParams) {
  return (
    <>
      <Suspense
        fallback={
          <div className='flex items-center justify-center h-[60vh]'>
            <div className='w-8 h-8 rounded-full border-4 border-[#81DAFB] border-t-transparent animate-spin'></div>
          </div>
        }>
        <Content blogId={params.blogId} />
      </Suspense>
    </>
  )
}
