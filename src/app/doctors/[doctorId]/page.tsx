import PageHeading from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/Container/Container'
import Image from 'next/image'
import { H2, H3, H6, P } from '@/components/ui/Typography/Typography'
import Link from 'next/link'
import ReviewSlider from '@/components/ReviewSlider/ReviewSlider'
import Accordion from '@/components/Accordion/Accordion'
import { mockedReviews } from '@/mocks/Reviews.mocks'

import doctorImage from '@/assets/team-2-770x460.jpg'
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaEnvelope } from 'react-icons/fa6'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'

const DoctorInfo = () => {
  return (
    <div className='bg-[#24466f] px-4 py-[30px]'>
      <H3 className='text-[#cde4ff] text-[26px] mb-5'>Про лікаря</H3>
      <ul>
        <li className='py-3 border-b border-solid border-[#4f6885]'>
          <P className='flex items-center justify-between text-white'>
            <span>Ім'я:</span>
            <span>Dr. Greg House</span>
          </P>
        </li>
        <li className='py-3 border-b border-solid border-[#4f6885]'>
          <P className='flex items-center justify-between text-white'>
            <span>Спеціальність</span>
            <span>Dr. Greg House</span>
          </P>
        </li>
        <li className='py-3 border-b border-solid border-[#4f6885]'>
          <P className='flex items-center justify-between text-white'>
            <span>Спеціалізація</span>
            <span>Dr. Greg House</span>
          </P>
        </li>
        <li className='py-3 border-b border-solid border-[#4f6885]'>
          <P className='flex items-center justify-between text-white'>
            <span>Освіта</span>
            <span>Dr. Greg House</span>
          </P>
        </li>
        <li className='py-3'>
          <P className='flex items-center justify-between text-white'>
            <span>Стаж роботи</span>
            <span>Dr. Greg House</span>
          </P>
        </li>
      </ul>
      <div className='mt-[55px]'>
        <StyledLinkButton href='/' className='w-full text-center'>
          Записатися на прийом
        </StyledLinkButton>
      </div>
    </div>
  )
}

const SingleDoctorPage = () => {
  return (
    <>
      <PageHeading title='Dr. Greg House' />
      <Container className='my-12 md:grid md:grid-cols-[3fr_2fr] md:gap-7 lg:grid-cols-[1fr_360px]'>
        <section>
          <Image src={doctorImage} alt='Dr. Greg House' className='mb-10' />

          <div>
            <H2 className='mb-5 text-left text-[26px] xl:text-[26px]'>Dr. Greg House</H2>
            <div className='flex items-center justify-start'>
              <div className='border border-solid border-[#56b0d2] w-[65px]' />
            </div>
            <ul className='mt-6 mb-3 flex gap-5'>
              <li>
                <Link href='https://www.linkedin.com/'>
                  <FaLinkedinIn fill='#909aa3' size={18} />
                </Link>
              </li>
              <li>
                <Link href='https://x.com/'>
                  <FaTwitter fill='#909aa3' size={18} />
                </Link>
              </li>
              <li>
                <Link href='https://www.facebook.com/'>
                  <FaFacebookF fill='#909aa3' size={18} />
                </Link>
              </li>
              <li>
                <Link href='mailto:JYb5l@example.com'>
                  <FaEnvelope fill='#909aa3' size={18} />
                </Link>
              </li>
            </ul>
            <P className='mt-6 mb-[48px] font-light'>
              The Department of Pediatrics strives to improve the well-being of all children. We will be recognized by
              UNMC, the region, and the nation as a center of excellence and innovation in health care, scholarship,
              education, service, and advocacy. Our faculty members will continuously improve their abilities through
              the support and opportunities provided by the Department and UNMC.
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
          <DoctorInfo />
        </section>
      </Container>
    </>
  )
}
export default SingleDoctorPage
