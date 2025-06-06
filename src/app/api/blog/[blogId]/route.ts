'use server'

import Blog from '@/interfaces/BlogItem.interface'
import connectMongoDB from '@/lib/connectMongoDB'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const blogId = url.pathname.split('/').pop()

  try {
    await connectMongoDB()
    const blog = await Blog.findById(blogId)

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
