'use client'

import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { userAuthSchema } from '@/lib/validations/auth'
import { Loader2 } from 'lucide-react'
import ThirdPartySignIn from './ThirdPartySignIn'

type FormData = z.infer<typeof userAuthSchema>

const SignInForm = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('from') || '/dashboard'

  const onSubmit = async (data: FormData) => {
    //setIsLoading(true)

    // const signInResult = await signIn('email', {
    //   email: data.email.toLowerCase(),
    //   redirect: false,
    //   callbackUrl: callbackUrl,
    // })

    // setIsLoading(false)

    // if (!signInResult?.ok) {
    //   return toast({
    //     title: 'Something went wrong.',
    //     description: 'Your sign in request failed. Please try again.',
    //     variant: 'destructive',
    //   })
    // }

    return toast({
      title: 'Coming soon.',
      description:
        'Login with email is currently not available, please use one of our providers',
      variant: 'destructive',
    })

    // return toast({
    //   title: 'Check your email',
    //   description: 'We sent you a login link. Be sure to check your spam too.',
    // })
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
