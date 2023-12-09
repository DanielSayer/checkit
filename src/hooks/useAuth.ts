import { getSignInUrl } from '@/lib/appRoutes'
import { authOptions, getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

const useAuth = async () => {
  const session = await getServerAuthSession()
  if (!session || !session.user.id) {
    redirect(authOptions?.pages?.signIn || getSignInUrl())
  }

  return { user: session.user }
}

export default useAuth
