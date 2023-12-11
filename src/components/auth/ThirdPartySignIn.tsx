'use client'

import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import {
  BiLogoGoogle as Google,
  BiLogoDiscordAlt as Discord,
} from 'react-icons/bi'
import { useState } from 'react'

interface ThirdPartySignInProps {
  isLoading: boolean
  callbackUrl: string
  setIsLoading: (isLoading: boolean) => void
}
const ThirdPartySignIn = ({
  isLoading,
  callbackUrl,
  setIsLoading,
}: ThirdPartySignInProps) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isDiscordLoading, setIsDiscordLoading] = useState<boolean>(false)

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    setIsGoogleLoading(true)
    signIn('google', { callbackUrl: callbackUrl })
  }

  const handleDiscordSignIn = () => {
    setIsLoading(true)
    setIsDiscordLoading(true)
    signIn('discord', { callbackUrl: callbackUrl })
  }
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading || isGoogleLoading || isDiscordLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Google className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
        <Button
          type="submit"
          variant="outline"
          onClick={() => {
            setIsDiscordLoading(true)
            signIn('discord', { callbackUrl: callbackUrl })
          }}
          disabled={isLoading || isGoogleLoading || isDiscordLoading}
        >
          {isDiscordLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Discord className="mr-2 h-4 w-4" />
          )}
          Discord
        </Button>
      </div>
    </>
  )
}

export default ThirdPartySignIn
