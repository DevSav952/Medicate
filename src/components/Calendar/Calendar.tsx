'use client'

import React, { useState, useEffect } from 'react'
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog'
import { H6, P } from '@/components/ui/Typography/Typography'
import { cn } from '@/utils/cn'
import ukLocale from '@fullcalendar/core/locales/uk'
import DoctorAppointmentCard from '@/components/DoctorAppointmentCard/DoctorAppointmentCard'
import dayjs from 'dayjs'

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [newEventTitle, setNewEventTitle] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null)

  // console.log('currentEvents', currentEvents)

  useEffect(() => {
    // Load events from local storage when the component mounts
    if (typeof window !== 'undefined') {
      const savedEvents = localStorage.getItem('events')
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents))
      }
    }
  }, [])

  useEffect(() => {
    // Save events to local storage whenever they change
    if (typeof window !== 'undefined') {
      localStorage.setItem('events', JSON.stringify(currentEvents))
    }
  }, [currentEvents])

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected)
    setIsDialogOpen(true)
  }

  const handleEventClick = (selected: EventClickArg) => {
    // Prompt user for confirmation before deleting an event
    if (window.confirm(`Are you sure you want to delete the event "${selected.event.title}"?`)) {
      selected.event.remove()
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setNewEventTitle('')
  }

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar // Get the calendar API instance.
      calendarApi.unselect() // Unselect the date range.

      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay
      }

      calendarApi.addEvent(newEvent)
      handleCloseDialog()
    }
  }

  return (
    <div className='mt-6'>
      <div className='flex flex-col w-full justify-start items-start gap-8'>
        <div className='w-full h-[200px]'>
          <H6>Прийоми на сьогодні</H6>
          <ul
            className={cn(
              'flex flex-col gap-4 mt-4 overflow-y-auto h-[170px]',
              currentEvents.length <= 0 && 'h-full mt-0'
            )}>
            {currentEvents.length <= 0 && (
              <div className='flex flex-col items-center justify-center h-full'>
                <P className='italic text-center text-gray-400'>Немає прийомів</P>
              </div>
            )}

            {currentEvents.length > 0 &&
              currentEvents.map((event: EventApi) => {
                console.log('event', event)
                console.log('event.start', event.start)

                return (
                  <>
                    <DoctorAppointmentCard
                      appointment={{
                        doctorName: event.title,
                        speciality: event.title,
                        _id: event.id,
                        patientName: event.title,
                        startTime: dayjs(event.start).toISOString(),
                        endTime: dayjs(event.end).toISOString()
                      }}
                    />
                  </>
                )
              })}
          </ul>
        </div>

        <div className='w-full'>
          <FullCalendar
            locale={ukLocale}
            height={'75vh'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }} // Set header toolbar options.
            initialView='dayGridMonth' // Initial view mode of the calendar.
            editable={true} // Allow events to be edited.
            selectable={true} // Allow dates to be selectable.
            selectMirror={true} // Mirror selections visually.
            dayMaxEvents={true} // Limit the number of events displayed per day.
            select={handleDateClick} // Handle date selection to create new events.
            eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
            eventsSet={(events) => setCurrentEvents(events)} // Update state with current events whenever they change.
            initialEvents={typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('events') || '[]') : []} // Initial events loaded from local storage.
          />
        </div>
      </div>

      {/* Dialog for adding new events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form className='space-x-5 mb-4' onSubmit={handleAddEvent}>
            <input
              type='text'
              placeholder='Event Title'
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)} // Update new event title as the user types.
              required
              className='border border-gray-200 p-3 rounded-md text-lg'
            />
            <button className='bg-green-500 text-white p-3 mt-5 rounded-md' type='submit'>
              Add
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Calendar
