'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { userSignInSchema } from '@/lib/validations/auth'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import ThirdPartySignIn from './ThirdPartySignIn'
import { registerUrl } from '@/lib/appRoutes'

type FormData = z.infer<typeof userSignInSchema>

const SignInForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('from') || '/dashboard'

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const signInResult = await signIn('credentials', {
      ...data,
      redirect: false,
    })
    if (!signInResult?.ok || signInResult?.error) {
      setError('root', {
        message: signInResult?.error ?? 'Something went wrong',
      })
      setIsLoading(false)
      return
    }
    router.push(callbackUrl)
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
              disabled={isLoading}
              {...register('email')}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              disabled={isLoading}
              {...register('password')}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
          {errors?.root && (
            <p className="px-1 text-xs text-red-500">{errors.root.message}</p>
          )}
        </div>
      </form>
      <ThirdPartySignIn
        isLoading={isLoading}
        callbackUrl={callbackUrl}
        setIsLoading={setIsLoading}
      />
    </div>
  )
}

export default SignInForm
