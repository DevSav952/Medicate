'use client'

import { Modal } from '@/components/ui/Modal/Modal'
import { useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { IMedicine } from '@/interfaces/Medicine.interface'
import { Input } from '@/components/ui/Input/Input'
import { Textarea } from '@/components/ui/Textarea/Textarea'

interface SelectMedicineModalProps {
  allowedAction: (selectedData: IMedicine) => void
}

const SelectMedicineModal = ({ allowedAction }: SelectMedicineModalProps) => {
  const [isMedicineModalOpen, setMedicineModalOpen] = useState(false)
  const [medicineName, setMedicineName] = useState('')
  const [dosing, setDosing] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = () => {
    allowedAction({
      medicineName,
      dosing,
      description
    })
    setMedicineModalOpen(false)
  }

  return (
    <>
      <Button onClick={() => setMedicineModalOpen(true)} className='border border-solid'>
        Додати препарат
      </Button>
      <Modal isOpen={isMedicineModalOpen} handleClose={() => setMedicineModalOpen(false)} className='bg-[#f7f7f7]'>
        <div className='w-full'>
          <div className='mt-1.5'>
            <Input
              name='medicineName'
              placeholder='Назва препарату'
              id='medicineName'
              onChange={(e) => {
                setMedicineName(e.target.value)
              }}>
              Назва препарату
            </Input>
          </div>

          <div className='mt-1.5'>
            <Input
              name='dosing'
              placeholder='Дозування'
              id='dosing'
              onChange={(e) => {
                setDosing(e.target.value)
              }}>
              Дозування препарату
            </Input>
          </div>

          <div className='mt-1.5'>
            <Textarea
              placeholder='Опис'
              name='description'
              id='description'
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              rows={5}>
              Опис
            </Textarea>
          </div>

          <Button className='border border-solid mt-4 w-full' onClick={onSubmit}>
            Зберегти
          </Button>
        </div>
      </Modal>
    </>
  )
}
export default SelectMedicineModal
