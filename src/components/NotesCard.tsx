'use client'

import { getEditNotesUrl } from '@/lib/appRoutes'
import { format } from 'date-fns'
import Link from 'next/link'

interface NotesCardProps {
  id: string
  title: string
  createdAt: Date
}

const NotesCard: React.FC<NotesCardProps> = ({ id, title, createdAt }) => {
  return (
    <div key={id}>
      <Link
        href={getEditNotesUrl(id)}
        className="font-semibold hover:underline"
      >
        {title}
      </Link>
      <div className="text-muted-foreground">
        Created at {format(createdAt, 'MMM yyyy')}
      </div>
    </div>
  )
}

export default NotesCard
