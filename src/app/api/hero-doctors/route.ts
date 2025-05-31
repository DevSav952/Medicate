'use server'

import connectMongoDB from '@/lib/connectMongoDB'
import { NextResponse } from 'next/server'
import Doctor, { Doctor as IDoctor } from '@/interfaces/Doctor.interface'

export async function GET(req: Request) {
  try {
    await connectMongoDB()

    const ids = [
      '683b57049bf0ba23205b323b',
      '683b57b29bf0ba23205b3243',
      '683b58219bf0ba23205b3249',
      '683b58709bf0ba23205b324f'
    ]

    const doctors: IDoctor[] = await Doctor.find({ _id: { $in: ids } })

    if (!doctors.length) {
      return NextResponse.json({ message: 'Doctors not found' }, { status: 404 })
    }

    return NextResponse.json(doctors)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
