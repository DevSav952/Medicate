'use client'

import { Container } from '@/components/ui/Container/Container'
import PageHeading from '@/components/PageHeading/PageHeading'
import AddEditBlogForm from '@/components/forms/AddEditBlogForm/AddEditBlogForm'
import { useEffect, useState } from 'react'
import { Session } from '@/interfaces/Session.interface'
import { getSession } from '@/lib/auth'

import { useRouter } from 'next/navigation'

const AddBlogPage = () => {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)

      const isDoctor = session?.role === 'doctor'
      if (!isDoctor) {
        router.replace('/not-found')
      }
    })
  }, [])

  return (
    <>
      <PageHeading title='Додати блог' />
      <Container>{session && <AddEditBlogForm session={session} />}</Container>
    </>
  )
}
export default AddBlogPage
