# Timeline Component

This component displays a timeline of events.

## Features

- Displays events with start and end times.
- Allows zooming and panning.
- Supports custom event rendering.
- Automatically adjusts padding to allow first and last events to be centered
- Dynamically generates ruler labels based on the time range of events

## Use in your static blog

```[html]
<link rel="stylesheet" href="https://unpkg.com/quartz-timeline@1.0.0/dist/timeline.css">
<script src="https://unpkg.com/quartz-timeline@1.0.0/dist/index.js"></script>
<div id="timeline-container"></div>
<script>
  const events = [
    {
      id: '1',
      title: 'Project Inception',
      description: 'The birth of our groundbreaking project.',
      date: '2020-01-15',
      important: true,
    },
    // Add more events here
  ];

  const container = document.getElementById('timeline-container');
  new QuartzTimeline.Timeline(container, events);
</script>
```
