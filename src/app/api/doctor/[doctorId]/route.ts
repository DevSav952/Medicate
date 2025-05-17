'use server'

import connectMongoDB from '@/lib/connectMongoDB'
import { NextResponse } from 'next/server'
import Doctor from '@/interfaces/Doctor.interface'
import { getSession } from '@/lib/auth'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const doctorId = url.pathname.split('/').pop()
  const session = await getSession()

  if (session.id !== doctorId) {
    return NextResponse.json({ message: 'Doctor not found' }, { status: 404 })
  }
  try {
    await connectMongoDB()
    const doctor = await Doctor.findById(doctorId)

    const { passwordHash, ...doctorData } = doctor._doc

    if (!doctor) {
      return NextResponse.json({ message: 'Doctor not found' }, { status: 404 })
    }

    return NextResponse.json(doctorData)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
