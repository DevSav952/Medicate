import { Doctor } from '@/interfaces/Doctor.interface'

import doctorImage from '@/assets/team-1.jpg'
import doctorImageSecond from '@/assets/team-2.jpg'
import doctorImageThird from '@/assets/team-3.jpg'
import doctorImageFourth from '@/assets/team-4.jpg'

export const mockedDoctors: Doctor[] = [
  {
    _id: '3bfb2b3b-09ee-4055-a74c-ba5f341bb1e1',
    doctorName: 'Шевченко Олександра',
    position: 'Офтальмолог',
    image: doctorImage,
    description: '',
    phone: '+ 800 123 45 67',
    email: 'info@beclinic.com'
  },
  {
    _id: '9e93b384-98df-4fd0-95a0-4455f613341c',
    doctorName: 'Петренко Олександр',
    position: 'Стоматолог',
    image: doctorImageSecond,
    description: '',
    phone: '+ 800 123 45 67',
    email: 'info@beclinic.com'
  },
  {
    _id: 'f317186b-496f-47b8-9f85-a2e97b9e6805',
    doctorName: 'Ковальчук Наталія',
    position: 'Педіатр',
    image: doctorImageThird,
    description: '',
    phone: '+ 800 123 45 67',
    email: 'info@beclinic.com'
  },
  {
    _id: '0e6ebb20-52af-48a6-ba3a-ea608c85b8f3',
    doctorName: 'Бондар Андрій',
    position: 'Кардіолог',
    image: doctorImageFourth,
    description: '',
    phone: '+ 800 123 45 67',
    email: 'info@beclinic.com'
  }
]
