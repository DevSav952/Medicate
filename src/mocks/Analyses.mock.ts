import { Analyses } from '@/interfaces/Analyses.interface'

export const mockedAnalyzes: Analyses[] = [
  {
    _id: '1a2b3c4d5e',
    userId: 'user123',
    analysisName: 'Blood Test',
    description: 'Complete blood count analysis',
    createdAt: '2025-05-10T08:30:00.000Z',
    updatedAt: '2025-05-10T08:30:00.000Z'
  },
  {
    _id: '2b3c4d5e6f',
    userId: 'user456',
    analysisName: 'X-Ray Chest',
    description: 'Chest X-Ray for lung diagnostics',
    createdAt: '2025-05-11T10:15:00.000Z',
    updatedAt: '2025-05-11T10:20:00.000Z'
  },
  {
    _id: '3c4d5e6f7g',
    userId: 'user789',
    analysisName: 'Urine Test',
    createdAt: '2025-05-12T09:00:00.000Z',
    updatedAt: '2025-05-12T09:00:00.000Z'
  },
  {
    _id: '4d5e6f7g8h',
    userId: 'user321',
    analysisName: 'MRI Brain',
    description: 'Detailed scan of brain for neurological issues',
    createdAt: '2025-05-13T11:45:00.000Z',
    updatedAt: '2025-05-13T11:45:00.000Z'
  },
  {
    _id: '5e6f7g8h9i',
    userId: 'user654',
    analysisName: 'Allergy Test',
    description: 'Check for food and seasonal allergies',
    createdAt: '2025-05-14T13:20:00.000Z',
    updatedAt: '2025-05-14T13:25:00.000Z'
  }
]
