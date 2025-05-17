'use client'

import { Modal } from '@/components/ui/Modal/Modal'
import { Button } from '@/components/ui/Button/Button'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { BUCKET_URL } from '@/constants/bucket'
import { twMerge } from 'tailwind-merge'

interface AttachmentPreviewModalProps {
  attachment: string
}

const AttachmentPreviewModal = ({ attachment }: AttachmentPreviewModalProps) => {
  const [isOpen, setOpen] = useState(false)

  const fileType = useMemo(() => attachment.split('.').pop(), [attachment])

  return (
    <>
      <Button onClick={() => setOpen(true)} className='border border-solid'>
        Переглянути файл
      </Button>
      <Modal
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        className={twMerge(
          '!p-0 bg-transparent !max-w-[500px]',
          fileType?.includes('pdf') &&
            '!max-w-[100%] h-[350px] w-[300px] sm:h-[500px] sm:w-[450px] md:h-[700px] md:w-[600px] lg:h-[800px] lg:w-[700px]'
        )}
        modalInnerStyles='!mb-0'
        buttonClassName={twMerge('absolute', fileType?.includes('pdf') && 'top-[-10px] right-[-10px]')}>
        {fileType && ['jpg', 'jpeg', 'png'].includes(fileType) && (
          <Image src={`${BUCKET_URL}/custom/files/${attachment}`} alt='' width={500} height={500} unoptimized />
        )}

        {fileType?.includes('pdf') && (
          <div className='w-full h-full flex items-center justify-center max-h-[800px] max-w-[900px]'>
            <iframe
              src={`${BUCKET_URL}/custom/files/${attachment}`}
              className='h-[300px] w-[250px] sm:h-[450px] sm:w-[400px] md:h-[650px] md:w-[550px] lg:h-[750px] lg:w-[650px]'
            />
          </div>
        )}
      </Modal>
    </>
  )
}
export default AttachmentPreviewModal
