import { useEffect, ReactNode } from 'react'
import { ReactPortal } from './ReactPortal/ReactPortal'
import { twMerge } from 'tailwind-merge'

import { FaTimes } from 'react-icons/fa'

interface IModal {
  children: ReactNode
  isOpen: boolean
  handleClose: (e?: any) => void
  className?: string
  buttonClassName?: string
  modalInnerStyles?: string
}

export function Modal({ children, isOpen, handleClose, className, buttonClassName, modalInnerStyles }: IModal) {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return (): void => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <ReactPortal wrapperId='react-portal-modal-container'>
      <>
        <div
          className='fixed top-0 left-0 w-screen h-screen bg-neutral-800 opacity-50 cursor-pointer z-[101]'
          onClick={(e) => handleClose(e)}
        />
        <div
          className={twMerge(
            'fixed z-[102] flex flex-col box-border overflow-hidden p-4 bg-white rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:p-5 sm:w-[510px] md:w-[550px] lg:w-[600px]',
            className
          )}>
          <button
            className={twMerge('py-2 px-2 self-end font-bold z-[2]', buttonClassName)}
            onClick={(e) => handleClose(e)}>
            <FaTimes size='24px' className='transition-all ease-linear duration-150 lg:hover:text-red' />
          </button>
          <div className={twMerge('flex items-center justify-center h-[100%] mb-10 box-border', modalInnerStyles)}>
            {children}
          </div>
        </div>
      </>
    </ReactPortal>
  )
}
