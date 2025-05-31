'use server'

import connectMongoDB from './connectMongoDB'
import Payment, { IPayment } from '@/interfaces/Payment.interface'

export const updatePayment = async (payment: IPayment) => {
  try {
    await connectMongoDB()

    await Payment.updateOne({ _id: payment._id }, payment)

    return { success: true }
  } catch (error) {
    console.error('Error updating payment:', error)
    return { success: false }
  }
}
