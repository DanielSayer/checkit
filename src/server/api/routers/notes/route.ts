import { TRPCClientError } from '@trpc/client'
import { createTRPCRouter, protectedProcedure } from '../../trpc'
import { noteSchema } from './noteSchemas'

export const notesRouter = createTRPCRouter({
  createNote: protectedProcedure.mutation(async ({ ctx }) => {
    const createdNote = await ctx.db.note.create({
      data: {
        title: 'New Note',
        authorId: ctx.session.user.id,
      },
    })

    return createdNote.id
  }),
  getUserNotes: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id

    return ctx.db.note.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
  }),
  saveNote: protectedProcedure
    .input(noteSchema)
    .mutation(async ({ ctx, input }) => {
      const userNote = await ctx.db.note.findFirst({
        where: {
          id: input.id,
          authorId: ctx.session.user.id,
        },
      })

      if (!userNote) {
        throw new TRPCClientError('Something went wrong')
      }

      await ctx.db.note.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
        },
      })

      return { ok: true }
    }),
})
