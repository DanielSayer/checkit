'use client'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import MobileNav from './MobileNav'
import UserAccountNav from './UserAccountNav'
import { buttonVariants } from './ui/button'
import { ThemeToggle } from './ThemeToggle'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'lucide-react'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b bg-background/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b">
          <Link href="/" className="flex z-40 font-semibold">
            <span>checkit</span>
          </Link>

          <MobileNav isAuth={!!session} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!session ? (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href={'/sign-in'}
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href={'/sign-in'}
                  className={buttonVariants({
                    size: 'sm',
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Dashboard
                </Link>
                <UserAccountNav
                  name={session?.user.name ?? ''}
                  email={session?.user.email ?? ''}
                  imageUrl={session?.user.image ?? ''}
                />
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
