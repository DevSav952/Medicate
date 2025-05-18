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

export const updateAnalysesById = async (analyses: IAnalyses) => {
  try {
    await connectMongoDB()

    await Analyses.updateOne(
      { _id: analyses._id },
      {
        patientId: analyses.patientId,
        analysisName: analyses.analysisName,
        description: analyses.description,
        date: analyses.date,
        fileName: analyses.fileName
      }
    )

    return { success: true }
  } catch (error) {
    console.error('Error edit analyses:', error)
    return { success: false }
  }
}
