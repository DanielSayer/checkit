import '@/styles/globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { TRPCReactProvider } from '@/trpc/react'

import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <SessionProvider session={session}>
              <Navbar />
              {children}
            </SessionProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
