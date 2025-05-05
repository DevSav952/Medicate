export interface Payment {
  _id: string
  userId: string
  paymentMethod?: 'card' | 'cash'
  title: string
  amount: number
  createdAt: string
  updatedAt: string
}
