import { getSignInUrl } from '@/lib/appRoutes'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

const useAuth = async (redirectLocation: string) => {
  const session = await getServerAuthSession()
  if (!session || !session.user.id) {
    redirect(getSignInUrl(redirectLocation))
  }

  return { user: session.user }
}

export default useAuth
