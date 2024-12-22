'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import TimelineEvent from './TimelineEvent'
import TimelineRuler from './TimelineRuler'

interface Event {
  id: string
  title: string
  description: string
  date: string
  important: boolean
}

interface TimelineProps {
  events: Event[]
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const minDate = new Date(Math.min(...events.map(e => new Date(e.date).getTime())))
  const maxDate = new Date(Math.max(...events.map(e => new Date(e.date).getTime())))

  const timelineLength = maxDate.getTime() - minDate.getTime()
  const paddingTime = timelineLength / 2

  minDate.setTime(minDate.getTime() - paddingTime)
  maxDate.setTime(maxDate.getTime() + paddingTime)

  const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)

  const getEventPosition = (date: string) => {
    const eventDate = new Date(date)
    const daysSinceStart = (eventDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    return (daysSinceStart / totalDays) * 100
  }

  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(event)
    return acc
  }, {} as Record<number, Event[]>)

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setHoveredEvent(event)
    const eventElement = document.getElementById(`event-${event.id}`)
    if (eventElement && timelineRef.current) {
      const scrollLeft = eventElement.offsetLeft - timelineRef.current.clientWidth / 2 + eventElement.clientWidth / 2
      timelineRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (sortedEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(sortedEvents[0])
      setHoveredEvent(sortedEvents[0])
    }
  }, [sortedEvents, selectedEvent])

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {(hoveredEvent || selectedEvent) && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">{hoveredEvent?.title || selectedEvent?.title}</h2>
            <p className="text-muted-foreground mb-4">
              {new Date(hoveredEvent?.date || selectedEvent?.date || '').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-foreground/90 leading-relaxed">{hoveredEvent?.description || selectedEvent?.description}</p>
          </CardContent>
        </Card>
      )}
      <ScrollArea className="w-full" ref={timelineRef}>
        <div className="relative h-[150px] mb-8" style={{ padding: `0 ${50}%` }}>
          <TimelineRuler minDate={minDate} maxDate={maxDate} />
          {Object.entries(groupedEvents).map(([year, yearEvents]) => (
            <TimelineEvent
              key={year}
              events={yearEvents}
              position={getEventPosition(yearEvents[0].date)}
              onEventClick={handleEventClick}
              onEventHover={setHoveredEvent}
              selectedEvent={selectedEvent}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Timeline

