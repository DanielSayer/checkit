'use client'

import { getEditNotesUrl } from '@/lib/appRoutes'
import { createEditorParagraphData } from '@/lib/createEditorBlockData'
import { createNoteSchema } from '@/lib/validations/notes'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { z } from 'zod'
import { Icons } from './Icons'
import { Button, ButtonProps } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { useToast } from './ui/use-toast'

type FormData = z.infer<typeof createNoteSchema>
interface CreateNotesButtonProps extends ButtonProps {}
interface QuickAddModalProps {
  toggle: () => void
}

const CreateNotesButton = ({ ...props }: CreateNotesButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggle = () => setIsOpen(!isOpen)
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setIsOpen(isOpen)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={toggle}>
        <Button {...props}>
          <Icons.add className="mr-2 h-4 w-4" />
          New note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <QuickAddModal toggle={toggle} />
      </DialogContent>
    </Dialog>
  )
}

const QuickAddModal = ({ toggle }: QuickAddModalProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const createNotes = api.notes.createNote.useMutation({
    onError: () => {
      setIsLoading(false)
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive',
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(createNoteSchema) })

  const handleEdit = async (data: FormData) => {
    setIsLoading(true)
    const content = createEditorParagraphData(data.content)
    const noteId = await createNotes.mutateAsync({ title: data.title, content })
    router.push(getEditNotesUrl(noteId))
  }

  const handleCreate = async (data: FormData) => {
    setIsLoading(true)
    const content = createEditorParagraphData(data.content)
    await createNotes.mutateAsync({ title: data.title, content })
    toggle()
    router.refresh()
  }

  return (
    <div>
      <div className="mb-5 border-b">
        <TextareaAutosize
          autoFocus
          id="title"
          placeholder="Note title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
          {...register('title')}
        />
        <TextareaAutosize
          id="content"
          placeholder="Write your notes here"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-md focus:outline-none mb-3"
          {...register('content')}
        />
      </div>
      <div className="flex justify-end gap-3 w-full">
        <Button
          disabled={isLoading}
          variant="secondary"
          onClick={handleSubmit(handleEdit)}
        >
          Edit
        </Button>
        <Button disabled={isLoading} onClick={handleSubmit(handleCreate)}>
          {isLoading ? (
            <>
              <Icons.spinner className="w-4 h-4 animate-spin mr-2" />
              <span>Creating...</span>
            </>
          ) : (
            'Create'
          )}
        </Button>
      </div>
      {errors?.title && (
        <p className="px-1 text-xs text-red-500 text-end mt-2">
          {errors.title.message}
        </p>
      )}
    </div>
  )
}

export default CreateNotesButton
