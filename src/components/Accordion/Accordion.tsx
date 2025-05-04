'use client'

import { useState, ReactNode, useRef } from 'react'
import { P } from '@/components/ui/Typography/Typography'

import { FaMinus, FaPlus } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

interface AccordionItemProps {
  item: { title: string; content: ReactNode }
  isSelected: boolean
  index: number
  allowedAction: (index: number | null) => void
}

const AccordionItem = ({ isSelected, index, item, allowedAction }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    isSelected ? allowedAction(null) : allowedAction(index)
  }

  return (
    <>
      <div
        onClick={handleClick}
        className='group flex justify-between p-5 bg-[#c5cbcf1a] border-b border-solid border-[#e8e8f6] cursor-pointer'>
        <P className='text-lg text-[#42474C] group-hover:text-blue-200 transition-all duration-300 ease-in-out'>
          {item.title}
        </P>
        <div className='flex items-center justify-center text-blue-200'>{isSelected ? <FaMinus /> : <FaPlus />}</div>
      </div>
      <div
        ref={contentRef}
        className={twMerge('max-h-[0px] overflow-hidden transition-all duration-300 ease-in-out')}
        style={{
          maxHeight: isSelected ? contentRef.current.scrollHeight : 0
        }}>
        {item.content}
      </div>
    </>
  )
}

interface AccordionProps {
  items: { title: string; content: ReactNode }[]
}

const Accordion = ({ items }: AccordionProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem key={i} isSelected={selectedItem === i} index={i} item={item} allowedAction={setSelectedItem} />
      ))}
    </div>
  )
}
export default Accordion
