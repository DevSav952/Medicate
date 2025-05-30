import mongoose, { Schema } from 'mongoose'
import { StaticImageData } from 'next/image'

export interface Doctor {
  _id: string
  email: string
  doctorName: string
  position: string
  image: string | StaticImageData
  description: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

const doctorSchema = new Schema(
  {
    doctorName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
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
  },
  {
    timestamps: true
  }
)

const Doctor = mongoose.models.Doctors || mongoose.model('Doctors', doctorSchema)
export default Doctor
