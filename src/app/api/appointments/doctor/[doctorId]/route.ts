'use server'

import Appointment from '@/interfaces/Appointment.interface'
import connectMongoDB from '@/lib/connectMongoDB'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const doctorId = url.pathname.split('/').pop()

  try {
    await connectMongoDB()
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate(
        'patient',
        'userName dateOfBirth bloodType diabetes rhFactor bloodTransfusion intoleranceToMedicines infectiousDiseases surgicalInterventions allergies'
      )
      .populate('doctor', 'doctorName position')

    if (!appointments) {
      return NextResponse.json({ message: 'Appointments not found' }, { status: 404 })
    }

    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
