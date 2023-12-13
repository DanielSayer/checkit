import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { hash, compare } from 'bcryptjs'
import { userAuthSchema } from './authSchemas'
import { TRPCClientError } from '@trpc/client'
import { db } from '@/server/db'

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(userAuthSchema)
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      })

      if (existingUser) {
        throw new TRPCClientError('User already exists')
      }

      const hashedPassword = await hash(input.password, 10)

      await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      })

      return { ok: true }
    }),
})

const errorMessage = 'Email or password is incorrect'
export async function authorizeCredentials(
  email: string | undefined,
  password: string | undefined,
) {
  if (!email || !password) {
    throw new Error('Please enter an email and password')
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error(errorMessage)
  }

  if (!user.password) {
    throw new Error('Please sign in with the provider you registered with')
  }

  const passwordsMatch = await compare(password, user.password)

  if (!passwordsMatch) {
    throw new Error(errorMessage)
  }
  return user
}
