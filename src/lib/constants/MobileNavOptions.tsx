import { ReactNode } from 'react'
import { getSignInUrl, registerUrl } from '../appRoutes'
import { Icons } from '@/components/Icons'

type NavOption = {
  title: ReactNode
  ref: string
}

export const notAuthorizedNavOptions: NavOption[] = [
  {
    title: (
      <>
        Get Started <Icons.arrowRight className="ml-2 h-5 w-5" />
      </>
    ),
    ref: registerUrl,
  },
  {
    title: 'Sign In',
    ref: getSignInUrl(),
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
  {
    title: 'Log out',
    ref: '/api/auth/signout',
  },
]
