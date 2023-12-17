'use client'

import EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import * as z from 'zod'

import { toast } from '@/components/ui/use-toast'
import '@/styles/editor.css'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button } from './ui/button'
import { Icons } from './Icons'
import { api } from '@/trpc/react'
import { Note } from '@prisma/client'

interface EditorProps {
  note: Pick<Note, 'id' | 'title' | 'content'>
}

const noteSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  content: z.any().optional(),
})

type FormData = z.infer<typeof noteSchema>

export function Editor({ note }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(noteSchema),
  })
  const ref = useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const mutation = api.notes.saveNote.useMutation({
    onError: () => {
      toast({
        title: 'Something went wrong.',
        description: 'Your note was not saved. Please try again.',
        variant: 'destructive',
      })
    },
  })

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const InlineCode = (await import('@editorjs/inline-code')).default

    const body = noteSchema.parse(note)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to create your note...',
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [note])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const blocks = await ref.current?.save()

    await mutation.mutateAsync({
      id: note.id,
      title: data.title,
      content: blocks,
    })
    setIsSaving(false)
    router.refresh()

    return toast({
      description: 'Your note has been saved.',
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MaxWidthWrapper>
        <div className="flex justify-end my-6">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <span>Save</span>
            )}
          </Button>
        </div>
        <div className="prose prose-stone mx-auto dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={note.title}
            placeholder="Note title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register('title')}
          />
          <div id="editor" className="min-h-[500px]" />
        </div>
      </MaxWidthWrapper>
    </form>
  )
}
