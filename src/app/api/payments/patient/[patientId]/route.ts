'use server'

import Appointment from '@/interfaces/Appointment.interface'
import Doctor from '@/interfaces/Doctor.interface'
import Patient from '@/interfaces/Patient.interface'
import Payment from '@/interfaces/Payment.interface'
import connectMongoDB from '@/lib/connectMongoDB'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const patientId = url.pathname.split('/').pop()

  try {
    await connectMongoDB()
    await Patient
    await Appointment
    await Doctor

    const payments = await Payment.find({ patient: patientId }).populate({
      path: 'appointment',
      select: 'startTime doctor',
      populate: {
        path: 'doctor',
        select: 'doctorName position'
      }
    })

    return NextResponse.json(payments)
  } catch (error) {
    console.error('Payment GET error', error)
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
