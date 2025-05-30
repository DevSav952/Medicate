'use server'

import connectMongoDB from '@/lib/connectMongoDB'
import { NextResponse } from 'next/server'
import Doctor, { Doctor as IDoctor } from '@/interfaces/Doctor.interface'

export async function GET(req: Request) {
  try {
    await connectMongoDB()
    const doctors: IDoctor[] = await Doctor.find()

    if (!doctors.length) {
      return NextResponse.json({ message: 'Doctors not found' }, { status: 404 })
    }

    return NextResponse.json(doctors)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
