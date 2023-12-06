import Link from 'next/link'

import UserAuthForm from '@/components/UserAuthForm'
import { GithubIcon } from 'lucide-react'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

const Page = () => {
  return (
    <main className="grid flex-col items-center justify-center h-[calc(100vh-56px)] lg:max-w-none lg:grid-cols-2">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-2 flex flex-col justify-center space-y-6 sm:mx-auto sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <GithubIcon className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>
            and
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}

export default Page
