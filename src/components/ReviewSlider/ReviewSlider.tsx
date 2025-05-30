'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import { P } from '@/components/ui/Typography/Typography'
import { IReview } from '@/interfaces/Review.interface'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ReviewSliderProps {
  reviews: IReview[]
}

const ReviewSlider = ({ reviews }: ReviewSliderProps) => {
  return (
    <>
      <Swiper
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (_, className) => {
            return `<span class="${className} review-slider-bullet"></span>`
          }
        }}
        effect='fade'
        centeredSlides
        autoplay={{
          delay: 15000,
          disableOnInteraction: true
        }}
        loop
        spaceBetween={20}
        modules={[Navigation, Pagination, Autoplay]}>
        {reviews.map((item) => {
          return (
            <SwiperSlide key={item._id}>
              <div className='bg-white shadow-custom-right p-4 mb-12 h-[260px] flex flex-col justify-between'>
                <P className='mb-5 text-[#42474C] italic text-[20px] line-clamp-3'>{item.review}</P>
                <div className='flex'>
                  <Image src={item.userPhoto} alt='user' className='w-[87px] h-[87px] rounded-full mr-4' />
                  <div className='flex flex-col justify-center'>
                    <P className='font-bold text-[#42474C]'>{item.userName}</P>
                    <P className='text-[#42474C] text-sm font-light'>{item.userPosition}</P>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className='mt-[-20px] z-[10] relative'>
        <div className='custom-pagination flex gap-2 justify-center h-[20px]' />
      </div>
    </>
  )
}
export default ReviewSlider
