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

interface EditorProps {
  note: any
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

    const response = true

    setIsSaving(false)

    if (!response) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your note was not saved. Please try again.',
        variant: 'destructive',
      })
    }

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
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert mt-20">
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
