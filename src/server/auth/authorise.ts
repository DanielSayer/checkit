import { compare } from 'bcryptjs'
import { db } from '../db'
import { authentication } from '../common/constants/errorsMessages'

export async function authorizeCredentials(
  email: string | undefined,
  password: string | undefined,
) {
  if (!email || !password) {
    throw new Error(authentication.emptyFields)
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error(authentication.invalidCredentials)
  }

  if (!user.password) {
    throw new Error(authentication.providerSignIn)
  }

  const passwordsMatch = await compare(password, user.password)

  if (!passwordsMatch) {
    throw new Error(authentication.invalidCredentials)
  }
  return user
}
