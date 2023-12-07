export function getSignInUrl(path?: string) {
  if (!path) {
    return '/api/auth/signin'
  }
  return `/api/auth/signin?from=${path}`
}

export const registerUrl = '/api/auth/register'
