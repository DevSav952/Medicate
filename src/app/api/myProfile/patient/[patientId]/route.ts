'use server'

import connectMongoDB from '@/lib/connectMongoDB'
import { NextResponse } from 'next/server'
import Patient from '@/interfaces/Patient.interface'
import { getSession } from '@/lib/auth'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const patientId = url.pathname.split('/').pop()
  const session = await getSession()

  if (session.id !== patientId) {
    return NextResponse.json({ message: 'Patient not found' }, { status: 404 })
  }

  try {
    await connectMongoDB()
    const patient = await Patient.findById(patientId)

    const { passwordHash, ...patientData } = patient._doc

    if (!patient) {
      return NextResponse.json({ message: 'Patient not found' }, { status: 404 })
    }

    return NextResponse.json(patientData)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
