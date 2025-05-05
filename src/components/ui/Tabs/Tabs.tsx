'use client'

import { ReactNode, useMemo } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { twMerge } from 'tailwind-merge'

interface TabsProps {
  tabs: {
    id: string
    label: string
    content: ReactNode
  }[]
  activeTab: string
  setActiveTab: (tabId: string) => void
}

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  const activeTabIndex = useMemo(() => tabs.findIndex((tab) => tab.id === activeTab), [activeTab, tabs])

  return (
    <>
      <div className='overflow-x-auto'>
        <div className='flex w-full justify-between'>
          {tabs.map((tab) => (
            <>
              <Button
                key={tab.id}
                allowedAction={() => setActiveTab(tab.id)}
                className={twMerge(
                  'min-w-[168px] w-full px-4 py-2 bg-transparent border-none transition-all duration-300 ease-in-out text-black rounded-none hover:bg-[#2a93c91a]',
                  activeTab === tab.id && 'bg-blue-100 text-white hover:bg-blue-100'
                )}>
                {tab.label}
              </Button>
            </>
          ))}
        </div>
      </div>
      <div className='p-2.5 border-t border-solid border-[#ccc]'>{tabs[activeTabIndex].content}</div>
    </>
  )
}
export default Tabs
