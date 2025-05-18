'use server'

import connectMongoDB from '@/lib/connectMongoDB'
import Appointment from '@/interfaces/Appointment.interface'
import { NextResponse } from 'next/server'
import Analyses from '@/interfaces/Analyses.interface'
import Doctor from '@/interfaces/Doctor.interface'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const appointmentId = url.pathname.split('/').pop()

  console.log('appointmentId', appointmentId)

  try {
    await connectMongoDB()
    await Analyses
    await Doctor

    const appointment = await Appointment.findById(appointmentId)
      .populate(
        'patient',
        'userName dateOfBirth bloodType diabetes rhFactor bloodTransfusion intoleranceToMedicines infectiousDiseases surgicalInterventions allergies'
      )
      .populate('doctor', 'doctorName position')
      .populate('analyzes', 'analysisName description date')

    if (!appointment) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 })
    }

    return NextResponse.json(appointment)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
