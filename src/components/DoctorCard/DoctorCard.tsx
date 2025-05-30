import Image from 'next/image'
import { Doctor } from '@/interfaces/Doctor.interface'
import { P, H6 } from '@/components/ui/Typography/Typography'
import Link from 'next/link'
import { BUCKET_URL } from '@/constants/bucket'

import { FaMobileAlt } from 'react-icons/fa'
import { FaEnvelope } from 'react-icons/fa'
import noImage from '@/assets/no-image.jpg'

interface DoctorCardProps {
  doctor: Doctor
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className='transition-all duration-300 ease-in-out hover:shadow-doctor-card'>
      {doctor.image ? (
        <Image src={`${BUCKET_URL}/custom/avatars/${doctor.image}`} alt='doctor' unoptimized width={270} height={270} />
      ) : (
        <Image src={noImage} alt='doctor' width={270} height={270} />
      )}

      <div className='pt-5 px-4 mb-3.5'>
        <P className='text-[#B5B9BB] text-[10px] uppercase tracking-[1px]'>{doctor.position}</P>

        <H6 className='font-normal text-[16px]'>
          <Link href={`doctors/${doctor._id}`} className='transition-all duration-300 ease-in-out hover:text-blue-100'>
            {doctor.doctorName}
          </Link>
        </H6>
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
          <li className='flex items-center'>
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
