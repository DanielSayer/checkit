export function getSignInUrl(path?: string) {
  if (!path) {
    return '/auth/signin'
  }
  return `/auth/signin?from=${path}`
}

export const registerUrl = '/auth/register'
