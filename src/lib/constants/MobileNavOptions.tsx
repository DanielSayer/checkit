import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'

type NavOption = {
  title: ReactNode
  ref: string
  className?: string
}

export const notAuthorizedNavOptions: NavOption[] = [
  {
    title: (
      <>
        Get Started <ArrowRight className="ml-2 h-5 w-5" />
      </>
    ),
    ref: '/sign-up',
  },
  {
    title: 'Sign In',
    ref: '/auth/api/sign-in',
  },
  {
    title: 'Pricing',
    ref: '/pricing',
  },
]

export const authorizedNavOptions: NavOption[] = [
  {
    title: 'Dashboard',
    ref: '/dashboard',
  },
  {
    title: 'Manage Subscription',
    ref: '/billing',
  },
  {
    title: 'Settings',
    ref: '/settings',
  },
  { title: 'Log out', ref: '/', className: buttonVariants({ size: 'sm' }) },
]
