import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getServerSession, type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env.mjs'
import { db } from '@/server/db'
import { authorizeCredentials } from './auth/authorise'

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.id
      return session
    },
    jwt: ({ token, account, user }) => {
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/signin',
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID ?? '',
      clientSecret: env.DISCORD_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return await authorizeCredentials(
          credentials?.email,
          credentials?.password,
        )
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
