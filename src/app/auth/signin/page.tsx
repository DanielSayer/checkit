import { Metadata } from 'next'
import Link from 'next/link'

import UserAuthForm from '@/components/UserAuthForm'
import { MdOutlinePlaylistAddCheck as CheckIt } from 'react-icons/md'
import { registerUrl } from '@/lib/appRoutes'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <CheckIt className="mx-auto h-8 w-8" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href={registerUrl}
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
