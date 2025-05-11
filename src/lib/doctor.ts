'use server'

import Doctor, { Doctor as IDoctor } from '@/interfaces/Doctor.interface'
import { revalidatePath } from 'next/cache'
import connectMongoDB from './connectMongoDB'
import { getSession } from './auth'

export const updateDoctorById = async (doctor: IDoctor) => {
  try {
    await connectMongoDB

    revalidatePath(`mycabinet/patient/${doctor._id}`)
    const updDoctor = await Doctor.findByIdAndUpdate(
      doctor._id,
      {
        email: doctor.email,
        doctorName: doctor.doctorName,
        description: doctor.description,
        phone: doctor.phone,
        position: doctor.position,
        image: doctor.image
      },
      { new: true }
    )

    const session = await getSession()

    session.userName = updDoctor.doctorName
    session.email = updDoctor.email
    session.image = updDoctor.image

    revalidatePath(`/mycabinet/doctor/${doctor._id}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating doctor:', error)
    return { success: false }
  }
}
