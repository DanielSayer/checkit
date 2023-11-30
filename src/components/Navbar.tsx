import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import MobileNav from './MobileNav'
import UserAccountNav from './UserAccountNav'
import { buttonVariants } from './ui/button'
import { ThemeToggle } from './ThemeToggle'

const Navbar = async () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b bg-background/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b">
          <Link href="/" className="flex z-40 font-semibold">
            <span>checkit</span>
          </Link>

          <MobileNav isAuth={true} />
          <div className="hidden items-center space-x-4 sm:flex">
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
              name={'User'}
              email={'user@test.com'}
              imageUrl={''}
            />
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
