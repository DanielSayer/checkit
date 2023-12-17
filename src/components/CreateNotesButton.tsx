'use client'

import { useState } from 'react'
import { Button, ButtonProps } from './ui/button'
import { Icons } from './Icons'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'

interface CreateNotesButtonProps extends ButtonProps {}

const CreateNotesButton = ({ className, ...props }: CreateNotesButtonProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const createNotes = api.notes.createNote.useMutation({
    onSuccess: (id) => {
      router.push(id)
    },
    onError: () => {
      setIsLoading(false)
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive',
      })
    },
  })

  const handleClick = async () => {
    setIsLoading(true)
    await createNotes.mutateAsync()
  }

  return (
    <Button
      onClick={handleClick}
      className={cn(
        {
          'cursor-not-allowed opacity-60': isLoading,
        },
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New note
    </Button>
  )
}

export default CreateNotesButton
