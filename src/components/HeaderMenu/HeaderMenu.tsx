'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { StyledLink } from '@/components/ui/StyledLink/StyledLink'
import { usePathname } from 'next/navigation'

import { FaTimes } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5'
import { Session } from '@/interfaces/Session.interface'

const links = [
  {
    href: '/',
    label: 'Головна'
  },
  {
    href: '/doctors',
    label: 'Лікарі'
  },
  {
    href: '/blog',
    label: 'Блог'
  },
  {
    href: '/contacts',
    label: 'Контакти'
  },
  {
    href: '/faq',
    label: 'ЧАПи'
  }
]

interface HeaderMenuProps {
  session?: Session
}

const HeaderMenu = ({ session }: HeaderMenuProps) => {
  const [isBurgerShow, setBurgerShow] = useState(false)
  const path = usePathname()

  return (
    <>
      <div
        className='cursor-pointer w-8 h-8 flex items-center justify-center'
        onClick={() => setBurgerShow(!isBurgerShow)}>
        <IoMenu size={30} className='text-white' />
      </div>
      {isBurgerShow && (
        <div
          onClick={() => setBurgerShow(false)}
          className='fixed top-0 left-0 w-full h-screen z-101 bg-neutral-800 opacity-50'
        />
      )}
      <div
        className={twMerge(
          'bg-white fixed top-0 left-[-200%] h-[100dvh] w-[290px] px-2.5 z-[20] flex flex-col transition-all ease-in-out duration-300',
          isBurgerShow && 'p-5 left-0'
        )}>
        <div className='flex justify-end'>
          <div className='flex items-center justify-center h-[30px] w-[30px] cursor-pointer'>
            <FaTimes size={20} className='text-black' onClick={() => setBurgerShow(!isBurgerShow)} />
          </div>
        </div>
        <div>
          <ul>
            {session?.isLoggedIn && session.role === 'patient' && (
              <>
                <li className='py-2.5 flex'>
                  <StyledLink
                    href={`/mycabinet/patient/${session.id}?tab=appointments`}
                    className={twMerge(
                      'text-[#1E2428] text-lg hover:text-[#5bafc9] transition-all duration-300 ease-in-out',
                      path === `/mycabinet/patient/${session.id}?tab=appointments` && 'text-[#5bafc9]'
                    )}
                    onClick={() => setBurgerShow(false)}>
                    Візити до лікаря
                  </StyledLink>
                </li>
                <li className='py-2.5 flex'>
                  <StyledLink
                    href={`/mycabinet/patient/${session.id}?tab=analyzes`}
                    className={twMerge(
                      'text-[#1E2428] text-lg hover:text-[#5bafc9] transition-all duration-300 ease-in-out',
                      path === `/mycabinet/patient/${session.id}?tab=analyzes` && 'text-[#5bafc9]'
                    )}
                    onClick={() => setBurgerShow(false)}>
                    Аналізи
                  </StyledLink>
                </li>
              </>
            )}

            {links.map((link) => (
              <li key={link.href} className='py-2.5 flex'>
                <StyledLink
                  href={link.href}
                  className={twMerge(
                    'text-[#1E2428] text-lg hover:text-[#5bafc9] transition-all duration-300 ease-in-out',
                    path === link.href && 'text-[#5bafc9]'
                  )}
                  onClick={() => setBurgerShow(false)}>
                  {link.label}
                </StyledLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
export default HeaderMenu
