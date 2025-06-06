'use client'

import { Session } from '@/interfaces/Session.interface'
import { IBlogItem } from '@/interfaces/BlogItem.interface'
import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { P } from '@/components/ui/Typography/Typography'
import MDEditor from '@uiw/react-md-editor'
import { BUCKET_URL } from '@/constants/bucket'
import Image from 'next/image'
import { saveFileToBucket } from '@/lib/bucket'
import { createBlog, updateBlogById } from '@/lib/blog'
import { createMarkdownFile } from '@/utils/createMarkdownFile'
import { replaceSpacesWithUnderscores } from '@/utils/replaceSpacesWithUnderscores'
import { getMarkdownFromS3 } from '@/lib/blog-files'

import { FaImage } from 'react-icons/fa6'
import { MdModeEdit } from 'react-icons/md'

interface AddEditBlogFormProps {
  session: Session
  blog?: IBlogItem
}

type BlogValues = Omit<IBlogItem, '_id' | 'createdAt' | 'updatedAt'>

/**
 * Validation:
 * All fields are required
 */

const AddEditBlogForm = ({ session, blog }: AddEditBlogFormProps) => {
  const isEditMode = !!blog?._id

  useEffect(() => {
    if (blog?.description) {
      getMarkdownFromS3(blog?.description).then((data) => {
        setDescription(data.content)
      })
    }
  }, [blog])

  const router = useRouter()

  const [fileName, setFileName] = useState(blog?.image)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditImage, setIsEditImage] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [description, setDescription] = useState<string | undefined>('')

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<BlogValues>({
    mode: 'onSubmit',
    defaultValues: {
      title: blog?.title || '',
      authorId: session.id
    }
  })

  const onSubmit: SubmitHandler<BlogValues> = async (values) => {
    setIsSubmitted(true)

    if (!fileName || !description) return

    if (isEditMode) {
      const file = await createMarkdownFile(description ?? '', replaceSpacesWithUnderscores(values.title))

      const bucketFileName = await saveFileToBucket(file, `blog_${file.name}.md`, 'beclinic/custom/blog')

      const updateBlog = {
        ...values,
        _id: blog._id,
        description: bucketFileName,
        image: fileName ?? '',
        author: session.id
      }

      const result = await updateBlogById(updateBlog)

      if (result.success) {
        toast.success('Блог успішно оновлено', {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-[#fff]'
        })

        router.push(`/blog/${result.blogId}`)
      } else {
        toast.success('Помилка оновлення блогу', {
          duration: 3000,
          className: 'border border-red bg-red text-[#fff]'
        })
      }
    } else {
      const file = await createMarkdownFile(description ?? '', replaceSpacesWithUnderscores(values.title))

      const bucketFileName = await saveFileToBucket(file, `blog_${file.name}.md`, 'beclinic/custom/blog')

      const newBlog = {
        ...values,
        description: bucketFileName,
        image: fileName ?? '',
        author: session.id
      }

      console.log('newBlog', newBlog)

      const result = await createBlog(newBlog)

      if (result.success) {
        toast.success('Блог успішно створено', {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-[#fff]'
        })

        router.push(`/blog/${result.blogId}`)
      } else {
        toast.success('Помилка створення блогу', {
          duration: 3000,
          className: 'border border-red bg-red text-[#fff]'
        })
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <Input
            type='text'
            placeholder='Введіть заголовок статті'
            name='title'
            id='title'
            obj={register('title', {
              required: { value: true, message: "Поле обов'язкове" },
              minLength: { value: 3, message: 'Заголовок має містити мінімум 3 символи' }
            })}>
            Заголовок статті
          </Input>
          {errors.title && <P className='text-red text-sm my-1'>{errors.title.message}</P>}
        </div>

        <div className='flex mb-4 flex-col'>
          <label className='block font-primary mb-2'>Зображення статті</label>

          <div className='relative h-[200px] w-[300px] rounded-sm bg-[#2a41e812] shadow-md flex items-center justify-center text-blue-200 mb-4'>
            {fileName ? (
              <Image
                alt=''
                width={300}
                height={200}
                className='w-full h-full rounded-sm object-cover'
                unoptimized
                src={`${BUCKET_URL}/custom/files/${fileName}`}
              />
            ) : (
              <FaImage className='dark:fill-grey-600' />
            )}

            <div className='flex items-center justify-center absolute right-[-25px] top-0'>
              <MdModeEdit
                className='dark:fill-grey-600'
                onClick={() => {
                  setIsEditImage(true)
                }}
              />
            </div>
          </div>
          {isEditImage && (
            <div className='flex items-center gap-3'>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }}>
                Завантажити
              </Button>
              <Button
                onClick={() => {
                  setFileName(blog?.image)
                  setIsEditImage(false)
                }}>
                Cкасувати
              </Button>
              <Button
                className='bg-red'
                onClick={() => {
                  setFileName('')
                  setIsEditImage(false)
                }}>
                Видалити фото
              </Button>
              <input
                ref={fileInputRef}
                type='file'
                name='file'
                id='file'
                accept='image/jpg, image/jpeg, image/png'
                className='hidden'
                onChange={async (e) => {
                  const extension = e.target.files![0].name.split('.').pop()

                  const fileName = await saveFileToBucket(
                    e.target.files![0],
                    `blog-${session.id}.${extension}`,
                    'beclinic/custom/files'
                  )

                  setFileName(fileName)
                  setIsEditImage(false)
                }}
              />
            </div>
          )}
          {isSubmitted && !fileName && <P className='text-red text-sm my-1'>Зображення не завантажено</P>}
        </div>

        <label className='block font-primary mb-2'>Текст статті</label>
        <div data-color-mode='light'>
          <MDEditor height={200} value={description} onChange={(value) => setDescription(value)} />
        </div>
        {isSubmitted && !description && <P className='text-red text-sm my-1'>Блог має містити текст</P>}

        <Button className='mt-5 w-full' type='submit'>
          Зберегти
        </Button>
      </form>

      <SnackBar />
    </>
  )
}
export default AddEditBlogForm
