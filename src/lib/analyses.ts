'use server'

import connectMongoDB from './connectMongoDB'
import Analyses, { Analyses as IAnalyses } from '@/interfaces/Analyses.interface'

export const createAnalyses = async (analyses: Omit<IAnalyses, '_id'>) => {
  try {
    await connectMongoDB()

    const doc = new Analyses({
      patientId: analyses.patientId,
      analysisName: analyses.analysisName,
      description: analyses.description,
      date: analyses.date,
      fileName: analyses.fileName
    })

    await doc.save()
    return { success: true }
  } catch (error) {
    console.error('Error creating analyses:', error)
    return { success: false }
  }
}
