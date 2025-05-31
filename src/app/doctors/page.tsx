'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import { H2, P } from '@/components/ui/Typography/Typography'
import Image from 'next/image'
import useSWR from 'swr'
import { Doctor } from '@/interfaces/Doctor.interface'
import { fetcher } from '@/utils/fetcher'
import DoctorCard from '@/components/DoctorCard/DoctorCard'

import certificateOne from '@/assets/certificate-img1.webp'
import certificateTwo from '@/assets/certificate-img2.webp'
import certificateThree from '@/assets/certificate-img3.webp'
import certificateFour from '@/assets/certificate-img4.webp'
import certificateFive from '@/assets/certificate-img5.webp'
import certificateSix from '@/assets/certificate-img6.webp'

const certificates = [
  {
    image: certificateOne,
    alt: 'certificate-1'
  },
  {
    image: certificateTwo,
    alt: 'certificate-2'
  },
  {
    image: certificateThree,
    alt: 'certificate-3'
  },
  {
    image: certificateFour,
    alt: 'certificate-4'
  },
  {
    image: certificateFive,
    alt: 'certificate-5'
  },
  {
    image: certificateSix,
    alt: 'certificate-6'
  }
]

const DoctorsPage = () => {
  const { data: doctors } = useSWR<Doctor[]>('/api/doctor', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <>
      <PageHeading title='Лікарі' />
      <section className='md:grid md:grid-cols-2'>
        <div className='bg-doctor-hero bg-cover bg-no-repeat w-full h-[240px] bg-center md:h-[440px] md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2' />
        <div className='py-[60px] px-4 lg:max-w-[600px] lg:ml-auto'>
          <H2 className='mb-5 text-center text-[26px] md:text-left xl:text-[26px]'>Наша Команда</H2>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
          <P className='mt-4 font-light'>
            Команда лікарів медичного центру — це висококваліфіковані спеціалісти з багаторічним досвідом, які постійно
            підвищують свою кваліфікацію та впроваджують сучасні методи діагностики й лікування. У нашому центрі
            працюють фахівці з різних напрямків медицини: неврологи, терапевти, педіатри, кардіологи, отоларингологи,
            офтальмологи, лікарі УЗД, реабілітологи та інші.
          </P>
        </div>
      </section>

      <Container className='mt-[45px]'>
        <section className='py-4'>
          <H2 className='mb-5 text-center text-[26px] md:text-left xl:text-[26px]'>Лікарі</H2>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
        </section>
        <section className='py-4 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[30px] lg:grid-cols-4'>
          {doctors?.map((item, i) => <DoctorCard key={i} doctor={item} />)}
        </section>
        <section className='pt-[50px] mb-9'>
          <H2 className='mb-5 text-center text-[26px] md:text-left xl:text-[26px]'>Наші нагороди</H2>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
          <P className='mt-4 font-light'>
            Медичний центр надає медичні послуги в усіх галузях медицини для дипломатів та їхніх сімей протягом останніх
            двадцяти років і продовжує підтримувати успішну співпрацю між двома установами.
          </P>
          <div className='grid grid-cols-2 mt-5 gap-5 md:grid-cols-3 lg:grid-cols-6'>
            {certificates.map((item, i) => (
              <div key={item.alt} className='flex items-center justify-center'>
                <Image src={item.image} alt={item.alt} />
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  )
}
export default DoctorsPage
