export function getSignInUrl(path?: string) {
  if (!path) {
    return '/signin'
  }
  return `/signin?from=${path}`
}

export const registerUrl = '/register'

export function getEditNotesUrl(id: string) {
  return `/edit/${id}`
}
