'use client'
import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'

interface MobileNavProps {
  isAuth: boolean
}

const MobileNav = ({ isAuth }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)
  const pathName = usePathname()

  const closeOnCurrent = (href: string) => {
    if (pathName === href) {
      toggleOpen()
    }
  }

  return (
    <div className="sm:hidden">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-muted-foreground"
      />
      {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
          <ul className="absolute border-b bg-background shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
            {!isAuth ? (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/sign-up')}
                    className="flex items-center w-full font-semibold text-foreground/90"
                    href={'/sign-up'}
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-muted-foreground/50" />
                <li>
                  <Link
                    href="/api/auth/signin"
                    onClick={() => closeOnCurrent('/sign-in')}
                    className="flex items-center w-full font-semibold text-foreground/90"
                  >
                    Sign in
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-muted-foreground/50" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/pricing')}
                    className="flex items-center w-full font-semibold text-foreground/90"
                    href={'/pricing'}
                  >
                    Pricing
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/dashboard')}
                    className="flex items-center w-full font-semibold"
                    href={'/dashboard'}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-muted-foreground/50" />
                <li>
                  <Link
                    className="flex items-center w-full font-semibold"
                    href={'/sign-out'}
                  >
                    Sign out
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
