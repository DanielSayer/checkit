import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSignInUrl(path?: string) {
  if (!path) {
    return '/api/auth/signin'
  }
  return `/api/auth/signin?from=${path}`
}
