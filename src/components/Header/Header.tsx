'use client'

import Image from 'next/image'
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { StyledLink } from '@/components/ui/StyledLink/StyledLink'
import AuthModal from '@/components/modals/AuthModal/AuthModal'

import logo from '@/assets/logo.png'
import { twMerge } from 'tailwind-merge'

const HEADER_ANIMATION_HEIGHT = 500

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > HEADER_ANIMATION_HEIGHT)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleOpenAuthModal = () => {
    console.log('called')

    setOpenAuthModal(true)
  }
  const handleCloseAuthModal = () => setOpenAuthModal(false)

  return (
    <>
      <header
        className={twMerge(
          'fixed top-0 left-0 w-full z-[100] bg-hero bg-center bg-no-repeat bg-cover transition-all ease-in-out duration-300 lg:bg-none lg:backdrop-blur',
          scrolled && 'lg:!bg-hero bg-center bg-no-repeat bg-cover'
        )}>
        <div className='flex justify-between py-9 px-4 w-full lg:max-w-[1200px] lg:mx-auto'>
          <div className='flex items-center justify-center'>
            <Link href='/'>
              <Image src={logo} alt='beClinic' width={182} height={32} />
            </Link>
          </div>

          <div className='hidden lg:block'>
            <ul className='flex items-center gap-5'>
              <li className='p-2.5 flex'>
                <StyledLink
                  href='/doctors'
                  className={twMerge(
                    'text-white text-lg hover:text-[#89E3FF] transition-all duration-300 ease-in-out',
                    path === '/doctors' && 'text-[#89E3FF]'
                  )}>
                  Лікарі
                </StyledLink>
              </li>
              <li className='p-2.5 flex'>
                <StyledLink
                  href='/blog'
                  className={twMerge(
                    'text-white text-lg hover:text-[#89E3FF] transition-all duration-300 ease-in-out',
                    path === '/blog' && 'text-[#89E3FF]'
                  )}>
                  Блог
                </StyledLink>
              </li>
              <li className='p-2.5 flex'>
                <StyledLink
                  href='/contacts'
                  className={twMerge(
                    'text-white text-lg hover:text-[#89E3FF] transition-all duration-300 ease-in-out',
                    path === '/contacts' && 'text-[#89E3FF]'
                  )}>
                  Контакти
                </StyledLink>
              </li>
              <li className='p-2.5 flex'>
                <StyledLink
                  href='/faq'
                  className={twMerge(
                    'text-white text-lg hover:text-[#89E3FF] transition-all duration-300 ease-in-out',
                    path === '/faq' && 'text-[#89E3FF]'
                  )}>
                  ЧАПи
                </StyledLink>
              </li>
            </ul>
          </div>

          <div className='flex items-center gap-4 ml-4'>
            <AuthModal
              isOpen={openAuthModal}
              handleOpenAuthModal={handleOpenAuthModal}
              handleCloseAuthModal={handleCloseAuthModal}
            />
            <div className='lg:hidden'>
              <HeaderMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
export default Header
