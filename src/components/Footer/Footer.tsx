import Image from 'next/image'
import Link from 'next/link'
import { P } from '@/components/ui/Typography/Typography'
import { H6 } from '@/components/ui/Typography/Typography'

import logo from '@/assets/logo.png'
import { Separator } from '../ui/Separator/Separator'

const departmentsData = [
  {
    title: 'Неврологія',
    link: '/'
  },
  {
    title: 'Травматологія',
    link: '/'
  },
  {
    title: 'Гінекологія',
    link: '/'
  },
  {
    title: 'Неврологія',
    link: '/'
  },
  {
    title: 'Кардіологія',
    link: '/'
  },
  {
    title: 'Пульмонологія',
    link: '/'
  }
]

const otherLinksData = [
  {
    title: 'Блог',
    link: '/blog'
  },
  {
    title: 'ЧАПи',
    link: '/faqs'
  },
  {
    title: 'Контакти',
    link: '/contacts'
  }
]

const SectionHeading = ({ title }: { title: string }) => {
  return (
    <>
      <H6 className='text-white'>{title}</H6>
      <div className='flex items-center justify-start mt-4 mb-6'>
        <div className='border border-solid border-[#c5cbcf] w-[65px]' />
      </div>
    </>
  )
}

const Footer = () => {
  return (
    <footer className='bg-[#919ba6]'>
      <div className='xl:max-w-[1200px] xl:mx-auto'>
        <section className='pt-[30px] md:grid md:grid-cols-[31%_1fr_1fr_1fr]'>
          <div className='p-4'>
            <Link href='/' className='block mb-5'>
              <Image src={logo} alt='BeClinic' />
            </Link>
            <P className='text-white font-light'>
              Вибір правильної лікарні та лікаря є важливими факторами, які суттєво впливають на лікування пацієнта.
              Багато пацієнтів надають перевагу приватній медицині.
            </P>
          </div>
          <div className='pt-[22px] px-4 pb-[30px] flex flex-col md:pt-4'>
            <SectionHeading title='Відділи' />
            <ul>
              {departmentsData.map((item) => (
                <li className='pb-[3px]'>
                  <Link
                    href={item.link}
                    className='text-white font-primary transition-all duration-300 ease-in-out font-light leading-[1.9em] hover:text-[#89e3ff]'>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='pt-[22px] px-4 pb-[30px] flex flex-col md:pt-4'>
            <SectionHeading title='Головний офіс' />
            <P className='mb-3 font-light text-white'>
              м. Вінниця, вулиця Келецька, 41
              <br />
              <Link href='mailto:info@beclinic.com' className='font-primary'>
                info@beclinic.com
              </Link>
              <br />
              <Link href='tel:80012345678'>800 1234 56 78</Link>
            </P>
            <P className='font-light text-white'>
              Пн-Пт: 9:00 - 19:00
              <br /> Сб: 10:00 - 18:00
              <br /> Нд: Вихідний
            </P>
          </div>

          <div className='pt-[22px] px-4 pb-[30px] flex flex-col md:pt-4'>
            <SectionHeading title='Посилання' />
            <ul>
              {otherLinksData.map((item) => (
                <li className='pb-[3px]'>
                  <Link
                    href={item.link}
                    className='text-white font-primary transition-all duration-300 ease-in-out font-light leading-[1.9em] hover:text-[#89e3ff]'>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Separator className='bg-[#ffffff26] my-0' />
        <section className='pb-4 md:flex md:justify-between'>
          <div className='pt-2.5 px-4 md:pt-0 md:px-2.5'>
            <P className='mt-2.5 text-white font-light md:text-sm'>Terms and Conditions | Privacy Policy</P>
          </div>
          <div className='pb-2.5 px-4 md:pt-0 md:px-2.5'>
            <P className='mt-2.5 text-white font-light md:text-sm'>DevDen ©. All rights reserved.</P>
          </div>
        </section>
      </div>
    </footer>
  )
}
export default Footer
