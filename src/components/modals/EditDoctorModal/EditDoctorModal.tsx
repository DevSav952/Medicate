'use client'

import { IconButton } from '@/components/ui/IconButton/IconButton'
import { Modal } from '@/components/ui/Modal/Modal'
import { useState } from 'react'
import { mockedDoctors } from '@/mocks/Doctors.mock'
import EditDoctorProfileForm from '@/components/forms/EditDoctorProfileForm/EditDoctorProfileForm'
import { Doctor } from '@/interfaces/Doctor.interface'

import { MdEdit } from 'react-icons/md'

const mockedDoctor = mockedDoctors[0]

interface EditDoctorModalProps {
  doctor: Doctor
}

const EditDoctorModal = ({ doctor }: EditDoctorModalProps) => {
  const [isOpen, setOpen] = useState(false)

  const handleOpenAuthModal = () => setOpen(true)
  const handleCloseAuthModal = () => setOpen(false)

  return (
    <>
      <IconButton
        icon={<MdEdit className='fill-blue-300' />}
        onClick={handleOpenAuthModal}
        className='absolute top-[-45px] right-0 bg-transparent lg:top-[-25px] '
      />
      <Modal isOpen={isOpen} handleClose={handleCloseAuthModal} className='h-[700px] lg:w-[960px]'>
        <div className='h-full w-full'>
          <EditDoctorProfileForm handleClose={handleCloseAuthModal} doctor={doctor} />
        </div>
      </Modal>
    </>
  )
}
export default EditDoctorModal
