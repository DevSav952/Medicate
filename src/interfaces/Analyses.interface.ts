import mongoose, { Schema } from 'mongoose'

export interface Analyses {
  _id: string
  patientId: string
  analysisName: string
  description?: string
  date: string
  fileName?: string
}

const analysesSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patients',
    required: true
  },
  analysisName: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: String,
    required: true
  },
  fileName: String
})

const Analyses = mongoose.models.Analyses || mongoose.model('Analyses', analysesSchema)
export default Analyses
