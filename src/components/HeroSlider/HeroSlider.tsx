'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { H2, H6 } from '@/components/ui/Typography/Typography'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const HeroSlider = () => {
  return (
    <div className='relative'>
      <Swiper
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} hero-slider-bullet"></span>`
          }
        }}
        effect='fade'
        centeredSlides
        autoplay={{
          delay: 15000,
          disableOnInteraction: true
        }}
        loop
        modules={[Navigation, Pagination, Autoplay, EffectFade]}>
        <SwiperSlide>
          <div className='bg-hero-bg-one bg-cover bg-no-repeat bg-center w-full h-[675px] xl:h-[800px]'>
            <div className='flex items-start flex-col justify-center h-full px-4 max-w-[1200px] mx-auto'>
              <H2 className='text-white sm:text-[50px] md:text-[60px] lg:text-[68px]'>Bringing Health</H2>
              <H6 className='text-white font-normal sm:text-[32px] md:text-[40px] lg:text-[44px]'>
                to life for the whole family
              </H6>
              <div className='flex gap-4 mt-3 sm:mt-6 lg:mt-9'>
                <StyledLinkButton href='/' className='bg-white text-blue-100'>
                  Відділи
                </StyledLinkButton>
                <StyledLinkButton variant='outline' href='/contacts'>
                  Контакти
                </StyledLinkButton>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='bg-hero-bg-two bg-cover bg-no-repeat bg-center w-full h-[675px] xl:h-[800px]'>
            <div className='flex items-start flex-col justify-center h-full px-4 max-w-[1200px] mx-auto'>
              <H2 className='text-white sm:text-[50px] md:text-[60px] lg:text-[68px]'>Bringing Health</H2>
              <H6 className='text-white font-normal sm:text-[32px] md:text-[40px] lg:text-[44px]'>
                to life for the whole family
              </H6>
              <div className='flex gap-4 mt-3 sm:mt-6 lg:mt-9'>
                <StyledLinkButton href='/' className='bg-white text-blue-100'>
                  Відділи
                </StyledLinkButton>
                <StyledLinkButton variant='outline' href='/contacts'>
                  Контакти
                </StyledLinkButton>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='bg-hero-bg-three bg-cover bg-no-repeat bg-center w-full h-[675px] xl:h-[800px]'>
            <div className='flex items-start flex-col justify-center h-full px-4 max-w-[1200px] mx-auto'>
              <H2 className='text-white sm:text-[50px] md:text-[60px] lg:text-[68px]'>Bringing Health</H2>
              <H6 className='text-white font-normal sm:text-[32px] md:text-[40px] lg:text-[44px]'>
                to life for the whole family
              </H6>
              <div className='flex gap-4 mt-3 sm:mt-6 lg:mt-9'>
                <StyledLinkButton href='/' className='bg-white text-blue-100'>
                  Відділи
                </StyledLinkButton>
                <StyledLinkButton variant='outline' href='/contacts'>
                  Контакти
                </StyledLinkButton>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className='mt-[-100px] z-[10] relative bg-red mb-[85px]'>
        <div className='custom-pagination flex gap-2 justify-center h-[20px]' />
      </div>
    </div>
  )
}
export default HeroSlider
