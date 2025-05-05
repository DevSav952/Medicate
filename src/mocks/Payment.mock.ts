import { Payment } from '@/interfaces/Payment.interface'

export const mockedPayments: Payment[] = [
  {
    _id: '3bfb2b3b-09ee-4055-a74c-ba5f341bb1e1',
    userId: '3bfb2b3b-09ee-4055-a74c-ba5f341bb1e1',
    paymentMethod: 'card',
    title: 'Аналіз крові',
    amount: 100,
    createdAt: '2023-06-04T10:00:00Z',
    updatedAt: '2023-06-04T11:00:00Z'
  },
  {
    _id: '3bfb2b3b-09ee-4055-a74c-ba5f341bb1e1',
    userId: '3bfb2b3b-09ee-4055-a74c-ba5f341bb1e1',
    title: 'Аналіз крові',
    amount: 100,
    createdAt: '2023-06-04T10:00:00Z',
    updatedAt: '2023-06-04T11:00:00Z'
  }
]
