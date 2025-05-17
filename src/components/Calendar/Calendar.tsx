'use client'

import React, { useState, useMemo } from 'react'
import { EventClickArg, EventApi } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { H6, P } from '@/components/ui/Typography/Typography'
import { cn } from '@/utils/cn'
import ukLocale from '@fullcalendar/core/locales/uk'
import CalendarAppointmentCard from '@/components/doctor/CalendarAppointmentCard/DoctorAppointmentCard'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { IAppointment } from '@/interfaces/Appointment.interface'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import EventInfoModal from '@/components/modals/EventInfoModal/EventInfoModal'

const Calendar: React.FC = () => {
  const params = useParams()
  const { doctorId } = params
  const [selectedEvent, setSelectedEvent] = useState<IAppointment | null>(null)

  const { data: appointments } = useSWR<IAppointment[]>(`/api/appointments/doctor/${doctorId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  const currentEvents: EventApi[] = useMemo(() => {
    return (
      (appointments?.map((appointment) => ({
        id: appointment._id,
        title: appointment.patient.userName,
        start: new Date(appointment.startTime),
        end: new Date(appointment.endTime)
      })) as EventApi[]) ?? []
    )
  }, [appointments])

  const todayEvents: EventApi[] = useMemo(() => {
    return currentEvents.filter((event) => dayjs(event.start).isSame(dayjs(), 'day'))
  }, [currentEvents])

  const handleEventClick = (selected: EventClickArg) => {
    const selectedEvent = appointments?.find((appointment) => appointment._id === selected.event.id)
    if (selectedEvent) {
      setSelectedEvent(selectedEvent)
    }
  }
  const handleEventInfoModalClose = () => setSelectedEvent(null)

  return (
    <div className='mt-6'>
      <div className='flex flex-col w-full justify-start items-start gap-8'>
        <div className='w-full h-[200px]'>
          <H6>Прийоми на сьогодні</H6>
          <ul
            className={cn(
              'flex flex-col gap-4 mt-4 overflow-y-auto h-[170px]',
              todayEvents.length <= 0 && 'h-full mt-0'
            )}>
            {todayEvents.length <= 0 && (
              <div className='flex flex-col items-center justify-center h-full'>
                <P className='italic text-center text-gray-400'>Немає прийомів</P>
              </div>
            )}

            {todayEvents.length > 0 &&
              todayEvents.map((event: EventApi) => {
                return (
                  <>
                    <CalendarAppointmentCard event={event} />
                  </>
                )
              })}
          </ul>
        </div>

        <div className='w-full'>
          <FullCalendar
            locale={ukLocale}
            height={'75vh'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={handleEventClick}
            events={currentEvents.map((event) => ({
              id: event.id,
              title: event.title,
              start: event.start?.toISOString() ?? '',
              end: event.end?.toISOString() ?? ''
            }))}
          />
        </div>
      </div>

      {selectedEvent && (
        <EventInfoModal isOpen={!!selectedEvent} event={selectedEvent} handleClose={handleEventInfoModalClose} />
      )}
    </div>
  )
}

export default Calendar
