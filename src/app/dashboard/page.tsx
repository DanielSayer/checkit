import CreateNotesButton from '@/components/CreateNotesButton'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/useAuth'

const Page = async () => {
  await useAuth()

  return (
    <main className="mx-auto max-w-7xl sm:p-10">
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-5 mx-2 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-2 font-bold text-4xl">My Notes</h1>
        <CreateNotesButton />
      </div>

      <div className="mt-16 flex flex-col items-center gap-2">
        <Icons.ghost className="h-8 w-8 text-muted-foreground" />
        <h3 className="font-semibold text-xl text-muted-foreground">
          Pretty empty around here
        </h3>
        <p className="text-muted-foreground">
          Let&apos;s create your first note
        </p>
      </div>
    </main>
  )
}
export default Page
