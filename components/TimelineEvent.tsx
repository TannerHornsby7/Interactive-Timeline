import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"

interface Event {
  id: string
  title: string
  date: string
  important: boolean
}

interface TimelineEventProps {
  events: Event[]
  position: number
  onEventClick: (event: Event) => void
  onEventHover: (event: Event | null) => void
  selectedEvent: Event | null
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ events, position, onEventClick, onEventHover, selectedEvent }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsExpanded(true)
    if (events.length === 1) {
      onEventHover(events[0])
    }
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false)
      onEventHover(null)
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="absolute transform -translate-x-1/2 flex flex-col items-center"
      style={{ left: `${position}%`, bottom: '0' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex flex-col-reverse items-center gap-2 transition-all duration-300 ease-in-out`}
           style={{ height: isExpanded ? `${events.length * 28}px` : '28px' }}>
        {events.map((event, index) => (
          <Button
            key={event.id}
            id={`event-${event.id}`}
            className={`w-5 h-5 rounded-full transition-all duration-300 ease-in-out ${
              event.important ? 'ring-2 ring-offset-2 ring-primary' : ''
            } ${selectedEvent?.id === event.id ? 'bg-primary scale-125' : 'bg-secondary hover:scale-110'}`}
            style={{
              opacity: isExpanded || index === 0 ? 1 : 0,
              transform: `scale(${isExpanded || index === 0 ? 1 : 0.5})`,
              pointerEvents: isExpanded || index === 0 ? 'auto' : 'none',
            }}
            onClick={() => onEventClick(event)}
            onMouseEnter={() => onEventHover(event)}
            onMouseLeave={() => onEventHover(null)}
            aria-label={event.title}
          />
        ))}
      </div>
    </div>
  )
}

export default TimelineEvent

