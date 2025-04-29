import PageHeading from '@/components/PageHeading/PageHeading'
import Image from 'next/image'
import { H1, H5, P } from '@/components/ui/Typography/Typography'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import Map from '@/components/Map/Map'
import { StyledLink } from '@/components/ui/StyledLink/StyledLink'

import phoneImage from '@/assets/contacts-icon-1.webp'
import emailImage from '@/assets/contacts-icon-2.webp'
import addressImage from '@/assets/contacts-icon-3.webp'
import doctorImage from '@/assets/icon-img-17.webp'
import treatmentImage from '@/assets/icon-img-18.webp'
import serviceImage from '@/assets/icon-img-19.webp'

const contactsItems: ContactsItem[] = [
  {
    icon: phoneImage,
    type: 'phone',
    title: 'Невідкладна допомога',
    info: '800 123 45 67'
  },
  {
    icon: emailImage,
    type: 'email',
    title: 'Email',
    info: 'info@beclinic.com'
  },
  {
    icon: addressImage,
    type: 'address',
    title: 'Адреса',
    info: 'вулиця Соборна, 51а'
  }
]

const advantageItems: AdvantageItem[] = [
  {
    icon: doctorImage,
    type: 'doctor',
    title: 'Досвідчені лікарі',
    description: "Ваше здоров'я - це ваш найважливіший актив. Довіряти його слід лише найкращим професіоналам."
  },
  {
    icon: treatmentImage,
    type: 'treatment',
    title: 'Персоналізоване лікування',
    description: 'Вибір лікування ідеально відповідає вашим цілям лікування ускладнень при ранньому втручанні.'
  },
  {
    icon: serviceImage,
    type: 'service',
    title: 'Негайне обслуговування',
    description: 'Ваш план лікування розрахований на постійний прогрес, з оперативним виконанням кожного етапу.'
  }
]

const officeItems: OfficeItem[] = [
  {
    address: 'вулиця Соборна, 51а',
    email: 'info@beclinic.com',
    phone: '800 1234 56 78'
  },
  {
    address: 'вулиця Келецька, 41',
    email: 'info@beclinic.com',
    phone: '800 1234 56 78'
  }
]

const workingHours: WorkingHoursItem[] = [
  {
    businessDay: '9:00-19:00',
    saturday: '10:00-18:00',
    sunday: 'Вихідний'
  },
  {
    businessDay: '9:00-19:00',
    saturday: '10:00-18:00',
    sunday: 'Вихідний'
  }
]

interface ContactsItem {
  icon: any
  type: string
  title: string
  info: string
}

interface AdvantageItem {
  icon: any
  type: string
  title: string
  description: string
}

interface OfficeItem {
  address: string
  email: string
  phone: string
}

interface WorkingHoursItem {
  businessDay: string
  saturday: string
  sunday: string
}

const ContactsItem = ({ item }: { item: ContactsItem }) => {
  return (
    <div className='flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start md:gap-[18px]'>
      <Image src={item.icon} alt={item.title} className='md:h-8 md:w-8' />
      <div className='flex flex-col items-center justify-center md:items-start md:justify-start'>
        <H5 className='mt-3 text-[#2a93c9] text-lg md:mt-0'>{item.title}</H5>

        {item.type === 'address' ? (
          <P className='text-[26px] text-[#1E2428]'>{item.info}</P>
        ) : (
          <Link
            className='transition-all duration-300 ease-in-out text-[26px] font-primary text-[#1E2428] hover:text-[#2A93C9] md:h-[31px]'
            href={item.type === 'phone' ? `tel:${item.info}` : `mailto:${item.info}`}>
            {item.info}
          </Link>
        )}
      </div>
    </div>
  )
}

const AdvantagesItem = ({ item }: { item: AdvantageItem }) => {
  return (
    <div
      className={twMerge(
        'flex flex-col items-center justify-center py-8 px-4',
        item.type === 'doctor' ? 'bg-[#6cc8df]' : item.type === 'treatment' ? 'bg-[#56b0d2]' : 'bg-[#2a88c9]'
      )}>
      <Image src={item.icon} alt={item.title} />
      <H5 className='mt-4 mb-1.5 text-white text-center text-lg'>{item.title}</H5>
      <P className='text-sm font-thin text-white text-center'>{item.description}</P>
    </div>
  )
}

const OfficeItem = ({ item, count }: { item: OfficeItem; count: number }) => {
  return (
    <div className='p-2.5 mb-5'>
      <H5 className='mb-2.5 text-center text-[#2a93c9] text-[26px] md:text-left'>Відділення #{count + 1}</H5>
      <P className='mt-3 text-center font-light md:text-left'>
        {item.address} <br />
        <StyledLink href={`mailto:${item.email}`} className='justify-center md:justify-start'>
          {item.email}
        </StyledLink>
        <StyledLink href={`tel:${item.phone}`} className='justify-center md:justify-start'>
          {item.phone}
        </StyledLink>
      </P>
    </div>
  )
}

const WorkingHoursItem = ({ item }: { item: WorkingHoursItem }) => {
  return (
    <div className='p-2.5 mb-5'>
      <H5 className='mb-2.5 text-center text-[#2a93c9] text-[26px] lg:text-left'>Графік роботи</H5>
      <P className='mt-3 text-center font-light lg:text-left'>Пн-Пт: {item.businessDay}</P>
      <P className='text-center font-light lg:text-left'>Сб: {item.saturday}</P>
      <P className='text-center font-light lg:text-left'>Hд: {item.sunday}</P>
    </div>
  )
}

export default function ContactsPage() {
  return (
    <>
      <PageHeading title='Контакти' />
      <div className='md:grid md:grid-cols-2'>
        <div className='bg-contacts bg-cover bg-no-repeat w-full h-[240px] bg-center md:h-[580px] md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2' />
        <div className='py-[60px] px-4 lg:max-w-[600px] lg:ml-auto'>
          <H1 className='mb-5 text-center text-[26px] md:text-left xl:text-[26px]'>Контактні дані</H1>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
          <P className='mt-5 text-center mb-[30px] md:text-left'>
            Наш медичний центр є найкращим вибором для дипломатів і співробітників 64 посольств та агентств ООН, а також
            приватних пацієнтів з більш ніж 60 країн світу.
          </P>
          <div className='flex flex-col gap-8'>
            {contactsItems.map((item, i) => (
              <ContactsItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row'>
        {advantageItems.map((item, i) => (
          <AdvantagesItem key={i} item={item} />
        ))}
      </div>
      <div className='lg:grid lg:grid-cols-2'>
        <Map />
        <div className='pt-[54px] md:py-8 md:pl-[50px] md:grid md:grid-cols-2 xl:w-[600px] xl:mr-auto'>
          <div className='flex flex-col'>
            {officeItems.map((item, i) => (
              <OfficeItem key={i} item={item} count={i} />
            ))}
          </div>
          <div className='flex flex-col'>
            {workingHours.map((item, i) => (
              <WorkingHoursItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
