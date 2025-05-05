'use client'

import { useState, ReactNode, useRef } from 'react'
import { P } from '@/components/ui/Typography/Typography'

import { FaMinus, FaPlus } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

interface AccordionItemProps {
  item: { title: string; content: ReactNode }
  isSelected: boolean
  isLast: boolean
  index: number
  allowedAction: (index: number | null) => void
}

const AccordionItem = ({ isSelected, index, item, allowedAction, isLast }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    isSelected ? allowedAction(null) : allowedAction(index)
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={twMerge(
          'group flex justify-between p-5 bg-white shadow-custom-right border-b border-solid border-[#e8e8f6] cursor-pointer',
          isLast && !isSelected && 'border-none'
        )}>
        <P className='text-lg text-[#42474C] group-hover:text-blue-200 transition-all duration-300 ease-in-out'>
          {item.title}
        </P>
        <div className='flex items-center justify-center text-blue-200'>{isSelected ? <FaMinus /> : <FaPlus />}</div>
      </div>
      <div
        ref={contentRef}
        className={twMerge(
          'max-h-[0px] overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-custom-right',
          !isLast && isSelected && 'border-b border-solid border-[#e8e8f6]'
        )}
        style={{
          maxHeight: isSelected && contentRef.current ? contentRef.current.scrollHeight : 0
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
        <AccordionItem
          key={i}
          isSelected={selectedItem === i}
          index={i}
          item={item}
          allowedAction={setSelectedItem}
          isLast={i === items.length - 1}
        />
      ))}
    </div>
  )
}
export default Accordion
