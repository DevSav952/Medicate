'use server'

import Patient, { Patient as IPatient } from '@/interfaces/Patient.interface'
import { revalidatePath } from 'next/cache'
import connectMongoDB from './connectMongoDB'
import { getSession } from './auth'

export const updatePatientById = async (patient: IPatient) => {
  try {
    await connectMongoDB

    const updPatient = await Patient.findByIdAndUpdate(
      patient._id,
      {
        email: patient.email,
        userName: patient.userName,
        dateOfBirth: patient.dateOfBirth,
        phoneNumber: patient.phoneNumber,
        bloodType: patient.bloodType,
        diabetes: patient.diabetes,
        rhFactor: patient.rhFactor,
        bloodTransfusion: patient.bloodTransfusion,
        intoleranceToMedicines: patient.intoleranceToMedicines,
        infectiousDiseases: patient.infectiousDiseases,
        surgicalInterventions: patient.surgicalInterventions,
        allergies: patient.allergies,
        image: patient.image ?? ''
      },
      { new: true }
    )

    const session = await getSession()

    session.userName = updPatient.userName
    session.email = updPatient.email
    session.image = updPatient.image

    revalidatePath(`/mycabinet/patient/${patient._id}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating patient:', error)
    return { success: false }
  }
}
