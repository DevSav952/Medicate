import mongoose, { Schema } from 'mongoose'

export interface Doctor {
  _id: string
  email: string
  doctorName: string
  position: string
  image: string
  description: string
  phone: string
}

const doctorSchema = new Schema({
  doctorName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  image: String,
  description: String
})

const Doctor = mongoose.models.Doctors || mongoose.model('Doctors', doctorSchema)
export default Doctor
