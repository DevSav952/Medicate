import mongoose, { Schema } from 'mongoose'
import { IAppointment } from './Appointment.interface'
import { Patient } from './Patient.interface'

export interface IPayment {
  _id: string
  appointment: IAppointment
  amount: number
  isPayed: boolean
  patient: Patient
  createdAt: string
  updatedAt: string
}

export interface CreatePayment {
  appointment: string
  amount: number
  isPayed: boolean
  patient: string
}

const paymentSchema = new Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointments',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    isPayed: {
      type: Boolean,
      required: true
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patients',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Payment = mongoose.models.Payments || mongoose.model('Payments', paymentSchema)
export default Payment
