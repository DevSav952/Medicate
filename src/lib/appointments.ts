'use server'

import mongoose from 'mongoose'
import connectMongoDB from './connectMongoDB'
import Appointment, { CreateAppointment } from '@/interfaces/Appointment.interface'

export const createAppointment = async (appointment: CreateAppointment) => {
  try {
    await connectMongoDB()

    const analyzes = (appointment.analyzes || []).map((id) => new mongoose.Types.ObjectId(id))

    const doc = new Appointment({
      reason: appointment.reason,
      patient: appointment.patient,
      doctor: appointment.doctor,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      description: appointment.description,
      analyzes: analyzes
    })

    await doc.save()
    return { success: true }
  } catch (error) {
    console.error('Error creating appointment:', error)
    return { success: false }
  }
}
