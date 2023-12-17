'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { userRegisterSchema } from '@/lib/validations/auth'
import { api } from '@/trpc/react'
import ThirdPartySignIn from './ThirdPartySignIn'
import { signIn } from 'next-auth/react'
import { Icons } from '../Icons'

type FormData = z.infer<typeof userRegisterSchema>

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('from') || '/dashboard'
  const mutation = api.auth.register.useMutation({
    onError: (e) => {
      setError('root', { message: e.message })
      setIsLoading(false)
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    await mutation.mutateAsync(data)
    const signInResult = await signIn('credentials', {
      ...data,
      redirect: false,
    })
    if (!signInResult?.ok || signInResult?.error) {
      setError('root', {
        message: 'Something went wrong, please contact support',
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
              Name
            </Label>
            <Input
              id="name"
              placeholder="John Smith"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register('name')}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-500">{errors.name.message}</p>
            )}
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
            {errors?.email && (
              <p className="px-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
            <Label className="sr-only" htmlFor="password">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading}
              {...register('confirmPassword')}
            />
            {errors?.confirmPassword && (
              <p className="px-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
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

export default RegisterForm
