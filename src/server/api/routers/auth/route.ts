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
