import { Metadata } from 'next'
import Link from 'next/link'

import RegisterForm from '@/components/auth/RegisterForm'
import { getSignInUrl } from '@/lib/appRoutes'
import { Icons } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

const Page = () => {
  return (
    <div className="container px-0 grid flex-col items-center justify-center h-[calc(100vh-56px)] w-screen lg:max-w-none lg:grid-cols-2">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-8 w-8" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an accout?{' '}
            <Link
              href={getSignInUrl()}
              className="underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
