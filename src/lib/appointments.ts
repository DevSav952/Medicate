'use server'

import connectMongoDB from './connectMongoDB'
import Appointment, { CreateAppointment } from '@/interfaces/Appointment.interface'

export const createAppointment = async (appointment: CreateAppointment) => {
  try {
    await connectMongoDB()

    const doc = new Appointment({
      patient: appointment.patientId,
      doctor: appointment.doctorId,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      description: appointment.description
    })

    await doc.save()
    return { success: true }
  } catch (error) {
    console.error('Error creating appointment:', error)
    return { success: false }
  }
}
