'use client'

import { getEditNotesUrl } from '@/lib/appRoutes'
import { format } from 'date-fns'
import Link from 'next/link'

interface NotesCardProps {
  id: string
  title: string
  editedAt: Date
}

const NotesCard = ({ id, title, editedAt }: NotesCardProps) => {
  return (
    <div key={id}>
      <Link
        href={getEditNotesUrl(id)}
        className="font-semibold hover:underline"
      >
        {title}
      </Link>
      <div className="text-muted-foreground">
        Last edited at {format(editedAt, "HH:mm 'on' dd MMM yyyy")}
      </div>
    </div>
  )
}

export default NotesCard
