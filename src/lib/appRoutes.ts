export function getSignInUrl(path?: string) {
  if (!path) {
    return '/signin'
  }
  return `/signin?from=${path}`
}

export const registerUrl = '/register'
