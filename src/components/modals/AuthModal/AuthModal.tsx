'use client'

import { Button } from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { H2, P } from '@/components/ui/Typography/Typography'
import SignInForm from '@/components/forms/SignInForm/SignInForm'
import { useState } from 'react'
import SignUpForm from '@/components/forms/SignUpForm/SignUpForm'
import Image from 'next/image'
import DoctorSignInForm from '@/components/forms/DoctorSignInForm/DoctorSignInForm'
import DoctorSignUpForm from '@/components/forms/DoctorSignUpForm/DoctorSignUpForm'

import patientAuth from '@/assets/patient-auth.jpg'
import doctorAuth from '@/assets/doctor-auth.jpg'

interface AuthModalProps {
  isOpen: boolean
  handleOpenAuthModal: () => void
  handleCloseAuthModal: () => void
}

const AuthModal = ({ isOpen, handleOpenAuthModal, handleCloseAuthModal }: AuthModalProps) => {
  const [openedModal, setOpenedModal] = useState<
    'patient-sign-in' | 'patient-sign-up' | 'doctor-sign-in' | 'doctor-sign-up'
  >('patient-sign-in')

  return (
    <>
      <Button
        allowedAction={handleOpenAuthModal}
        className='border border-solid border-white text-white bg-transparent'>
        Увійти
      </Button>
      <Modal isOpen={isOpen} handleClose={handleCloseAuthModal} className='h-[700px] lg:w-[960px]'>
        <div className='h-full'>
          {(openedModal === 'patient-sign-in' || openedModal === 'patient-sign-up') && (
            <>
              <div className='h-full flex flex-col lg:grid lg:grid-cols-2 lg:w-[920px]'>
                <div className='hidden lg:relative lg:w-full lg:h-full lg:block'>
                  <Image
                    src={patientAuth}
                    alt='sign-up'
                    className='absolute top-[-60px] left-[-20px] bottom-[-60px] w-full h-[700px]'
                  />
                </div>
                <div className='flex flex-col justify-between h-full'>
                  {openedModal === 'patient-sign-in' ? (
                    <>
                      <div>
                        <H2 className='mb-2 text-[32px]'>З поверненням, пацієнте!</H2>
                        <P className='mb-2'>Будь ласка, внесiть свої дані для входу.</P>

                        <SignInForm handleClose={handleCloseAuthModal} />
                      </div>
                      <div className='flex flex-col'>
                        <P className='mb-2'>
                          Досі немає аккаунту?{' '}
                          <span
                            className='text-[#0674d1] cursor-pointer'
                            onClick={() => setOpenedModal('patient-sign-up')}>
                            Зареєструватися
                          </span>
                        </P>

                        <P className='mb-2'>
                          Працюєте в медичному центрі?{' '}
                          <span
                            className='text-[#0674d1] cursor-pointer'
                            onClick={() => setOpenedModal('doctor-sign-in')}>
                            Увійти
                          </span>
                        </P>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <H2 className='mb-2 text-[32px]'>Вітаємо, пацієнте!</H2>
                        <P className='mb-2'>Будь ласка, внесiть свої дані для реєстрації.</P>

                        <SignUpForm handleClose={handleCloseAuthModal} />
                      </div>
                      <div className='flex flex-col'>
                        <P className='mb-2'>
                          Вже маєте акаунт?{' '}
                          <span
                            className='text-[#0674d1] cursor-pointer'
                            onClick={() => setOpenedModal('patient-sign-in')}>
                            Увійти
                          </span>
                        </P>

                        <P className='mb-2'>
                          Працюєте в медичному центрі?{' '}
                          <span
                            className='text-[#0674d1] cursor-pointer'
                            onClick={() => setOpenedModal('doctor-sign-in')}>
                            Увійти
                          </span>
                        </P>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {(openedModal === 'doctor-sign-in' || openedModal === 'doctor-sign-up') && (
            <>
              <div className='h-full flex flex-col lg:grid lg:grid-cols-2 lg:w-[920px]'>
                <div className='hidden lg:relative lg:w-full lg:h-full lg:block'>
                  <Image
                    src={doctorAuth}
                    alt='sign-up'
                    className='absolute top-[-60px] left-[-20px] bottom-[-60px] w-full h-[700px]'
                  />
                </div>
                <div className='flex flex-col justify-between h-full'>
                  {openedModal === 'doctor-sign-in' ? (
                    <>
                      <div>
                        <H2 className='mb-2 text-[32px]'>З поверненням, лікарю!</H2>
                        <P className='mb-2'>Будь ласка, внесiть свої дані для входу.</P>

                        <DoctorSignInForm handleClose={handleCloseAuthModal} />
                      </div>
                      <div className='flex flex-col'>
                        <P className='mb-2'>
                          Новий працівник у BeClinic?{' '}
                          <span
                            className='text-[#0674d1] cursor-pointer'
                            onClick={() => setOpenedModal('doctor-sign-up')}>
                            Зареєструватися
                          </span>
                        </P>

                        <P className='mb-2'>
                          Бажаєте увійти як пацієнт?{' '}
                          <span
                            className='text-[#0674d1] cursor-pointer'
                            onClick={() => setOpenedModal('patient-sign-in')}>
                            Увійти
                          </span>
                        </P>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='mt-[-16px]'>
                        <H2 className='mb-2 text-[32px]'>Вітаємо, лікарю!</H2>
                        <P className='mb-2'>Будь ласка, внесiть свої дані для реєстрації.</P>

                        <DoctorSignUpForm handleClose={handleCloseAuthModal} />
                      </div>
                      <div className='flex flex-col mb-[-16px]'>
                        <P className='mb-2'>
                          Працюєте в медичному центрі?{' '}
                          <span
                            className='text-[#0674d1] cursor-pointer'
                            onClick={() => setOpenedModal('doctor-sign-in')}>
                            Увійти
                          </span>
                        </P>
                        <P className='mb-2'>
                          Бажаєте увійти як пацієнт?{' '}
                          <span
                            className='text-[#0674d1] cursor-pointer'
                            onClick={() => setOpenedModal('patient-sign-in')}>
                            Увійти
                          </span>
                        </P>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}
export default AuthModal
