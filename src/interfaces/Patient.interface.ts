import mongoose, { Schema } from 'mongoose'

export interface Patient {
  _id: string
  email: string
  userName: string
  dateOfBirth: string
  phoneNumber: string
  bloodType: string
  diabetes: string
  rhFactor: string
  bloodTransfusion: string
  intoleranceToMedicines: string
  infectiousDiseases: string
  surgicalInterventions: string
  allergies: string
  image?: string
}

const patientSchema = new Schema({
  userName: {
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
  dateOfBirth: String,
  phoneNumber: String,
  bloodType: String,
  diabetes: String,
  rhFactor: String,
  bloodTransfusion: String,
  intoleranceToMedicines: String,
  infectiousDiseases: String,
  surgicalInterventions: String,
  allergies: String,
  image: String
})

const Patient = mongoose.models.Patients || mongoose.model('Patients', patientSchema)
export default Patient
