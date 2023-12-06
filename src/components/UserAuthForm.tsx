'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { userAuthSchema } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import {
  BiLogoGoogle as Google,
  BiLogoDiscordAlt as Discord,
} from 'react-icons/bi'

type FormData = z.infer<typeof userAuthSchema>

const UserAuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const [isDiscordLoading, setIsDiscordLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('from') || '/dashboard'

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    const signInResult = await signIn('email', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: callbackUrl,
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      })
    }

    return toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.',
    })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          variant="outline"
          onClick={() => {
            setIsGoogleLoading(true)
            signIn('google', { callbackUrl: callbackUrl })
          }}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Google className="mr-2 h-4 w-4" />
          )}{' '}
          Google
        </Button>
        <Button
          type="submit"
          variant="outline"
          onClick={() => {
            setIsDiscordLoading(true)
            signIn('discord', { callbackUrl: callbackUrl })
          }}
          disabled={isLoading || isGoogleLoading}
        >
          {isDiscordLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Discord className="mr-2 h-4 w-4" />
          )}{' '}
          Discord
        </Button>
      </div>
    </div>
  )
}

export default UserAuthForm
