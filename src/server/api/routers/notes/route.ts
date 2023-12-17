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
})
