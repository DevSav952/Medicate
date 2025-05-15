import { H6, P } from '@/components/ui/Typography/Typography'
import { IMedicine } from '@/interfaces/Medicine.interface'

interface MedicineCardProps {
  medicine: IMedicine
}

const MedicineCard = ({ medicine }: MedicineCardProps) => {
  return (
    <div className='grid bg-white shadow-custom-right p-4 gap-4 grid-cols-[100px_75px_1fr] sm:grid-cols-[100px_100px_1fr]'>
      <H6>{medicine.name}</H6>
      <P>{medicine.days}</P>
      <P>{medicine.description}</P>
    </div>
  )
}
export default MedicineCard
