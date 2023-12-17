import { createTRPCRouter, protectedProcedure } from '../../trpc'

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
})
