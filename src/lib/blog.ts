'use server'

import connectMongoDB from './connectMongoDB'
import Blog, { CreateBlog, IBlogItem } from '@/interfaces/BlogItem.interface'

export const getBlogById = async (blogId: string): Promise<IBlogItem | null> => {
  try {
    await connectMongoDB()

    const blog = await Blog.findById(blogId)
    return blog
  } catch (error) {
    console.error('Error creating blog:', error)
    return null
  }
}

export const createBlog = async (blog: CreateBlog) => {
  try {
    await connectMongoDB()

    const doc = new Blog({
      ...blog
    })

    const newBlog = await doc.save()

    return { success: true, blogId: newBlog._id }
  } catch (error) {
    console.error('Error creating blog:', error)
    return { success: false }
  }
}

export const updateBlogById = async (blog: Omit<IBlogItem, 'createdAt' | 'updatedAt'>) => {
  try {
    await connectMongoDB()

    await Blog.updateOne(
      {
        _id: blog._id
      },
      {
        ...blog
      }
    )

    return { success: true, blogId: blog._id }
  } catch (error) {
    console.error('Error updating blog:', error)
    return { success: false }
  }
}
