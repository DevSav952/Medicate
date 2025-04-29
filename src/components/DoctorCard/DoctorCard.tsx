import Image from 'next/image'
import { Doctor } from '@/interfaces/Doctor.interface'
import { P, H6 } from '@/components/ui/Typography/Typography'
import Link from 'next/link'

import { FaMobileAlt } from 'react-icons/fa'
import { FaEnvelope } from 'react-icons/fa'

interface DoctorCardProps {
  doctor: Doctor
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className='transition-all duration-300 ease-in-out hover:shadow-doctor-card'>
      <Image src={doctor.image} alt='doctor' />
      <div className='pt-5 px-4 mb-3.5'>
        <P className='text-[#B5B9BB] text-[10px] uppercase tracking-[1px]'>{doctor.position}</P>
        <H6 className='font-normal text-[16px]'>{doctor.doctorName}</H6>
      </div>
      <div className='ml-4 pb-[30px]'>
        <ul>
          <li className='flex items-center'>
            <Link
              href={`tel:${doctor.phone}`}
              className='flex items-center text-[#b5b9bb] fill-[##b5b9bb] font-primary font-light text-sm transition-all duration-300 ease-in-out hover:text-[#0674d1] hover:[&_svg]:fill-[#0674d1]'>
              <FaMobileAlt className='mr-2.5' size={14} />
              {doctor.phone}
            </Link>
          </li>
          <li>
            <Link
              href={`mailto:${doctor.email}`}
              className='flex items-center text-[#b5b9bb] fill-[##b5b9bb] font-primary font-light text-sm transition-all duration-300 ease-in-out hover:text-[#0674d1] hover:[&_svg]:fill-[#0674d1]'>
              <FaEnvelope className='mr-2.5' size={14} />
              {doctor.email}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default DoctorCard
