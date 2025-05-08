'use client'

import { IconButton } from '@/components/ui/IconButton/IconButton'
import { Modal } from '@/components/ui/Modal/Modal'
import { useState } from 'react'
import EditPatientProfileForm from '@/components/forms/EditPatientProfileForm/EditPatientProfileForm'
import { mockedPatient } from '@/mocks/Patient.mock'

import { MdEdit } from 'react-icons/md'

const EditProfileModal = () => {
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
        <div className='h-[calc(100%-50px)] overflow-y-scroll w-full mt-[-50px]'>
          <EditPatientProfileForm handleClose={handleCloseAuthModal} patient={mockedPatient} />
        </div>
      </Modal>
    </>
  )
}
export default EditProfileModal
