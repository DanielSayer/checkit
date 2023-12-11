import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import bcrypt from 'bcrypt'
import { userAuthSchema } from './authSchemas'
import { TRPCClientError } from '@trpc/client'

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

      const hashedPassword = await bcrypt.hash(input.password, 10)

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
