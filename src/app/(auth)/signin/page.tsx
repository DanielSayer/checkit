import Link from 'next/link'
import { Metadata } from 'next'

import SignInForm from '@/components/auth/LoginForm'
import { Icons } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

const Page = () => {
  return (
    <div className="container flex h-[calc(100vh-56px)] w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <SignInForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page
