import { H6, P } from '@/components/ui/Typography/Typography'
import { IMedicine } from '@/interfaces/Medicine.interface'

import { FaTrash } from 'react-icons/fa6'

interface MedicineCardProps {
  medicine: IMedicine
  onDelete?: (medicineName: string) => void
}

const MedicineCard = ({ medicine, onDelete }: MedicineCardProps) => {
  return (
    <div className='relative grid bg-white shadow-custom-right p-4 gap-4 grid-cols-[100px_75px_1fr] sm:grid-cols-[100px_100px_1fr]'>
      <H6>{medicine.medicineName}</H6>
      <P>{medicine.dosing}</P>
      <P>{medicine.description}</P>
      {onDelete && (
        <div
          onClick={() => onDelete(medicine.medicineName)}
          className='absolute top-0 right-5 w-5 h-5 bg-red flex items-center justify-center shadow-md cursor-pointer'>
          <FaTrash size={14} className='fill-white' />
        </div>
      )}
    </div>
  )
}
export default MedicineCard
