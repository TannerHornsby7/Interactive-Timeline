import React from 'react'

interface TimelineRulerProps {
  minDate: Date
  maxDate: Date
}

const TimelineRuler: React.FC<TimelineRulerProps> = ({ minDate, maxDate }) => {
  const totalYears = maxDate.getFullYear() - minDate.getFullYear()
  const yearStep = Math.max(1, Math.ceil(totalYears / 10)) // Aim for about 10 labels

  const labels = []
  for (let year = minDate.getFullYear(); year <= maxDate.getFullYear(); year += yearStep) {
    labels.push(new Date(year, 0, 1))
  }

  const getPosition = (date: Date) => {
    return ((date.getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * 100
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-8">
      {labels.map((date) => (
        <div
          key={date.toISOString()}
          className="absolute border-l border-border h-full"
          style={{ left: `${getPosition(date)}%` }}
        >
          <span className="absolute bottom-full mb-1 text-xs text-muted-foreground transform -translate-x-1/2">
            {date.getFullYear()}
          </span>
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
    </div>
  )
}

export default TimelineRuler

