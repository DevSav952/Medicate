'use server'

import connectMongoDB from '@/lib/connectMongoDB'
import Appointment from '@/interfaces/Appointment.interface'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const appointmentId = url.pathname.split('/').pop()

  try {
    await connectMongoDB()
    const appointments = await Appointment.findById(appointmentId)
      .populate(
        'patient',
        'userName dateOfBirth bloodType diabetes rhFactor bloodTransfusion intoleranceToMedicines infectiousDiseases surgicalInterventions allergies'
      )
      .populate('doctor', 'doctorName position')

    if (!appointments) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 })
    }

    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
