'use client'

import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import Image from 'next/image'
import { H3, H6, P } from '@/components/ui/Typography/Typography'
import Link from 'next/link'
import ReviewSlider from '@/components/ReviewSlider/ReviewSlider'
import Accordion from '@/components/Accordion/Accordion'
import { mockedReviews } from '@/mocks/Reviews.mocks'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { Doctor } from '@/interfaces/Doctor.interface'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'
import { getExperience } from '@/utils/getExperience'
import { getUkrainianPlural } from '@/utils/getUkrainianPlural'
import { BUCKET_URL } from '@/constants/bucket'

import { FaLinkedinIn, FaTwitter, FaFacebookF, FaEnvelope } from 'react-icons/fa6'
import noImage from '@/assets/no-image.jpg'

interface DoctorInfoProps {
  doctor?: Doctor
}

const DoctorInfo = ({ doctor }: DoctorInfoProps) => {
  return (
    <div className='bg-white shadow-custom-right px-4 py-[30px]'>
      <H3 className='text-black text-[26px] mb-5'>Про лікаря</H3>
      <ul>
        <li className='py-3 border-b border-solid border-[#e1e5e3]'>
          <P className='flex items-center justify-between text-[#64727d]'>
            <span>Ім'я:</span>
            <span>{doctor?.doctorName}</span>
          </P>
        </li>
        <li className='py-3 border-b border-solid border-[#e1e5e3]'>
          <P className='flex items-center justify-between text-[#64727d]'>
            <span>Спеціальність</span>
            <span>{doctor?.position}</span>
          </P>
        </li>
        <li className='py-3 border-b border-solid border-[#e1e5e3]'>
          <P className='flex items-center justify-between text-[#64727d]'>
            <span>Освіта</span>
            <span>ВНМУ ім. М.І. Пирогова</span>
          </P>
        </li>
        <li className='py-3'>
          <P className='flex items-center justify-between text-[#64727d]'>
            <span>Стаж роботи</span>
            <span>
              {getUkrainianPlural(getExperience(dayjs(doctor?.createdAt).toISOString()), ['рік', 'роки', 'років'])}
            </span>
          </P>
        </li>
      </ul>
      <div className='mt-[55px]'>
        <StyledLinkButton href='/appointments/add' className='w-full text-center bg-blue-100 text-white'>
          Записатися на прийом
        </StyledLinkButton>
      </div>
    </div>
  )
}

const SingleDoctorPage = () => {
  const params = useParams()
  const { doctorId } = params

  const { data: doctor } = useSWR<Doctor>(`/api/doctor/${doctorId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  return (
    <>
      <PageHeading title={doctor?.doctorName} />
      <Container className='my-12 md:grid md:grid-cols-[3fr_2fr] md:gap-7 lg:grid-cols-[1fr_360px]'>
        <section>
          {doctor?.image ? (
            <Image
              src={`${BUCKET_URL}/custom/avatars/${doctor.image}`}
              alt='doctor'
              unoptimized
              className='w-full h-full max-h-[440px] mb-10 object-cover'
              width={730}
              height={440}
            />
          ) : (
            <Image
              src={noImage}
              alt='doctor'
              className='w-full h-full max-h-[440px] mb-10 object-cover'
              width={730}
              height={440}
            />
          )}
          <div>
            <div className='flex items-center justify-start'>
              <div className='border border-solid border-[#56b0d2] w-[65px]' />
            </div>
            <ul className='mt-6 mb-3 flex gap-5'>
              <li>
                <Link href='https://www.linkedin.com/'>
                  <FaLinkedinIn
                    fill='#909aa3'
                    size={18}
                    className='transition-all duration-300 ease-in-out hover:fill-blue-100'
                  />
                </Link>
              </li>
              <li>
                <Link href='https://x.com/'>
                  <FaTwitter
                    fill='#909aa3'
                    size={18}
                    className='transition-all duration-300 ease-in-out hover:fill-blue-100'
                  />
                </Link>
              </li>
              <li>
                <Link href='https://www.facebook.com/'>
                  <FaFacebookF
                    fill='#909aa3'
                    size={18}
                    className='transition-all duration-300 ease-in-out hover:fill-blue-100'
                  />
                </Link>
              </li>
              <li>
                <Link href={`mailto:${doctor?.email}`}>
                  <FaEnvelope
                    fill='#909aa3'
                    size={18}
                    className='transition-all duration-300 ease-in-out hover:fill-blue-100'
                  />
                </Link>
              </li>
            </ul>
            <P className='mt-6 mb-[48px] font-light'>
              Кафедра педіатрії прагне поліпшити добробут усіх дітей. Ми будемо визнані UNMC, регіоном та країною як
              центр передового досвіду та інновацій у галузі охорони здоров'я, науки, освіти, обслуговування та захисту
              прав. Наші викладачі будуть постійно вдосконалювати свої здібності завдяки підтримці та можливостям, що
              надаються кафедрою та UNMC.
            </P>

            <div className='mb-12 md:hidden'>
              <DoctorInfo />
            </div>

            <Accordion
              items={[
                {
                  title: 'Огляд',
                  content: (
                    <div className='pt-2.5 pb-5 px-4'>
                      <ul className='mt-2.5'>
                        <li>
                          <span className='font-primary font-bold text-primary'>Програми та спеціальності</span>
                          <span className='ml-2 font-light text-primary'>Медицина для новонароджених</span>
                        </li>
                        <li>
                          <span className='font-primary font-bold text-primary'>Наукові інтереси</span>
                          <span className='ml-2 font-light text-primary'>
                            Легенева гіпертензія розвитку легень новонароджених
                          </span>
                        </li>
                        <li>
                          <span className='font-primary font-bold text-primary'>Тренінги + Освіта</span>
                          <span className='ml-2 font-light text-primary'>Університет штату Нью-Йорк у Буффало</span>
                        </li>
                        <li>
                          <span className='font-primary font-bold text-primary'>Сертифікати</span>
                          <span className='ml-2 font-light text-primary'>Педіатрія</span>
                        </li>
                        <li>
                          <span className='font-primary font-bold text-primary'>Страхування</span>
                          <span className='ml-2 font-light text-primary'>ОСЦПВ, КАСКО</span>
                        </li>
                      </ul>
                    </div>
                  )
                },
                {
                  title: 'Відзнаки',
                  content: (
                    <div className='py-5 px-4'>
                      <P className='font-light'>
                        Старший загальний хірург та керівник відділення баріатричної хірургії. Приватна лікарня
                        преміум-класу, надає медичну допомогу найвищої якості, індивідуальне лікування від провідних
                        фахівців країни в найкоротші терміни. Спеціалізація - загальна та баріатрична хірургія, всі
                        малоінвазивні методи. Старший загальний хірург та керівник відділення баріатричної хірургії.
                        Приватна лікарня преміум-класу, надає медичну допомогу найвищої якості, індивідуальний підхід до
                        лікування від провідних фахівців країни в найкоротші терміни.
                      </P>
                    </div>
                  )
                },
                {
                  title: 'Професійне членство',
                  content: (
                    <div className='py-5 px-4'>
                      <P className='font-light'>
                        Спеціалізується на загальній та баріатричній хірургії, всіх малоінвазивних методах. Старший
                        загальний хірург та керівник відділення баріатричної хірургії. Приватна лікарня преміум-класу,
                        надає медичну допомогу найвищої якості, індивідуальне лікування від провідних фахівців країни, в
                        найкоротші терміни.
                      </P>
                    </div>
                  )
                }
              ]}
            />
            <H6 className='mb-5 mt-12 text-[26px]'>Відгуки</H6>
            <div className='md:max-w-[500px] md:mx-auto'>
              <ReviewSlider reviews={mockedReviews} />
            </div>
          </div>
        </section>
        <section className='hidden md:block'>
          <DoctorInfo doctor={doctor} />
        </section>
      </Container>
    </>
  )
}
export default SingleDoctorPage
