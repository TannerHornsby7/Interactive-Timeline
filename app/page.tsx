'use client'

import Timeline from '@/components/Timeline'

const events = [
  {
    id: '1',
    title: 'Project Inception',
    description: 'The birth of our groundbreaking project, setting the foundation for future innovations.',
    date: '2020-01-15',
    important: true,
  },
  {
    id: '2',
    title: 'First Milestone',
    description: 'Reaching our first significant milestone, proving the viability of our concept.',
    date: '2021-03-22',
    important: false,
  },
  {
    id: '3',
    title: 'Major Breakthrough',
    description: 'A pivotal moment in our journey, unlocking new possibilities and expanding our horizons.',
    date: '2022-07-10',
    important: true,
  },
  {
    id: '4',
    title: 'Global Recognition',
    description: 'Our project gains international attention, opening doors to new partnerships and opportunities.',
    date: '2023-11-05',
    important: false,
  },
  {
    id: '5',
    title: 'Future Vision',
    description: 'Looking ahead to the next phase of our project, with ambitious goals and exciting prospects.',
    date: '2024-02-28',
    important: true,
  },
  {
    id: '6',
    title: 'Long-term Goal',
    description: 'Our ultimate objective, representing the pinnacle of our project\'s aspirations.',
    date: '2030-12-31',
    important: true,
  },
  {
    id: '7',
    title: 'Another Milestone',
    description: 'An additional significant achievement in our project\'s journey.',
    date: '2022-09-15',
    important: false,
  },
  {
    id: '8',
    title: 'Team Expansion',
    description: 'Growing our team to meet the increasing demands of the project.',
    date: '2023-04-01',
    important: false,
  },
  {
    id: '9',
    title: 'Product Launch',
    description: 'The official launch of our groundbreaking product to the public.',
    date: '2024-01-10',
    important: true,
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Interactive Timeline</h1>
      <Timeline events={events} />
    </main>
  )
}

