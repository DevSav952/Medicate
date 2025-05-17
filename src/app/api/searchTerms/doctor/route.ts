'use server'

import connectMongoDB from '@/lib/connectMongoDB'
import { NextResponse } from 'next/server'
import Doctor from '@/interfaces/Doctor.interface'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const position = url.searchParams.get('search')

  console.log('position', position)

  try {
    await connectMongoDB()
    const doctors = await Doctor.find({
      position: { $regex: position || '', $options: 'i' }
    })

    return NextResponse.json(doctors)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
