import mongoose, { Schema } from 'mongoose'
import { Analyses } from './Analyses.interface'
import { IMedicine } from './Medicine.interface'

export interface IAppointment {
  _id: string
  patient: {
    _id: string
    userName: string
    dateOfBirth: string
    bloodType: string
    diabetes: string
    rhFactor: string
    bloodTransfusion: string
    intoleranceToMedicines: string
    infectiousDiseases: string
    surgicalInterventions: string
    allergies: string
  }
  doctor: {
    _id: string
    doctorName: string
    position: string
  }
  reason: string
  startTime: string
  endTime: string
  description?: string
  analyzes?: Analyses[]

  // Doctors fields

  medicine?: IMedicine[]
  diagnosis?: string
  treatment?: string
}

export interface CreateAppointment {
  patient: string
  doctor: string
  startTime: string
  endTime: string
  reason: string
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
  reason: {
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
