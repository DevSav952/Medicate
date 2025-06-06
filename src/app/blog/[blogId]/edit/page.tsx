'use client'

import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import AddEditBlogForm from '@/components/forms/AddEditBlogForm/AddEditBlogForm'
import { useEffect, useState } from 'react'
import { Session } from '@/interfaces/Session.interface'
import { getSession } from '@/lib/auth'
import useSWR from 'swr'
import { useParams, useRouter } from 'next/navigation'
import { IBlogItem } from '@/interfaces/BlogItem.interface'
import { fetcher } from '@/utils/fetcher'

const AddBlogPage = () => {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const params = useParams()
  const { blogId } = params

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)

      const isDoctor = session?.role === 'doctor'
      if (!isDoctor) {
        router.replace('/not-found')
      }
    })
  }, [])

  const { data: blog, isLoading } = useSWR<IBlogItem>(`/api/blog/${blogId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  const isDataLoading = !session?.id || isLoading

  return (
    <>
      <PageHeading title='Редагувати блог' />
      <Container>{session && blog && <AddEditBlogForm session={session} blog={blog} />}</Container>

      {isDataLoading && (
        <div className='flex items-center justify-center h-[40vh]'>
          <div className='w-8 h-8 rounded-full border-4 border-[#81DAFB] border-t-transparent animate-spin'></div>
        </div>
      )}
    </>
  )
}
export default AddBlogPage
