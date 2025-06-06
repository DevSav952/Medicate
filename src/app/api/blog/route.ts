'use server'

import Blog from '@/interfaces/BlogItem.interface'
import connectMongoDB from '@/lib/connectMongoDB'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectMongoDB()
    const blogs = await Blog.find()

    if (!blogs) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
