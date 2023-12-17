import { Editor } from '@/components/NoteEditor'
import useAuth from '@/hooks/useAuth'
import { db } from '@/server/db'
import { notFound } from 'next/navigation'

interface EditPageProps {
  params: {
    noteId: string
  }
}

const Page = async ({ params }: EditPageProps) => {
  const session = await useAuth()
  const { noteId } = params

  const note = await db.note.findFirst({
    where: {
      id: noteId,
      authorId: session.user.id,
    },
  })

  if (!note) {
    notFound()
  }

  return <Editor note={note} />
}

export default Page
