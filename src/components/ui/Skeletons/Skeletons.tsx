import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
}

export const SkeletonText = ({ className }: SkeletonProps) => {
  return <div className={cn('space-y-2 animate-pulse bg-gray-300 rounded-sm', className)} />
}

export const SkeletonAvatar = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn('flex items-center space-x-4 animate-pulse w-[80px] h-[80px] bg-gray-300 rounded-full', className)}
    />
  )
}

export const DoctorCardSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn('animate-pulse bg-gray-100', className)}>
      <div className='w-full h-[270px] bg-gray-300 sm:w-full sm:h-[350px] md:h-[220px]' />
      <div className='pt-5 px-4 mb-3.5'>
        <div className='h-2.5 w-[80px] bg-gray-300 mb-0.5' />
        <div className='h-4 w-[120px] bg-gray-300 mb-0.5' />
      </div>
      <div className='ml-4 pb-[30px]'>
        <div className='h-3.5 w-[100px] bg-gray-300 mb-0.5' />
        <div className='h-3.5 w-[100px] bg-gray-300 mb-0.5' />
      </div>
    </div>
  )
}
