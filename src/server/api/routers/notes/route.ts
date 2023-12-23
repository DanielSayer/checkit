import { TRPCClientError } from '@trpc/client'
import { createTRPCRouter, protectedProcedure } from '../../trpc'
import { createNoteSchema, noteSchema } from './noteSchemas'

export const notesRouter = createTRPCRouter({
  createNote: protectedProcedure
    .input(createNoteSchema)
    .mutation(async ({ ctx, input }) => {
      const createdNote = await ctx.db.note.create({
        data: {
          title: input.title ?? 'New Note',
          content: input.content ?? '',
          authorId: ctx.session.user.id,
        },
      })

      return createdNote.id
    }),
  getUserNotes: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id

    return await ctx.db.note.findMany({
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
