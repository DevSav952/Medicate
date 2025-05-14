import { Analyses } from './Analyses.interface'
import mongoose, { Schema } from 'mongoose'

export interface IAppointment {
  _id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  speciality: string
  startTime: string
  endTime: string
  description?: string
  analyzes?: Analyses[]
}
export interface CreateAppointment {
  patientId: string
  doctorId: string
  startTime: string
  endTime: string
  description?: string
  analyzes?: Analyses[]
}

const appointmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patients',
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctors',
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  description: String
  //  analyzes: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Doctors',
  // }
})

const Appointment = mongoose.models.Appointments || mongoose.model('Appointments', appointmentSchema)
export default Appointment
