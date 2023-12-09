import useAuth from '@/hooks/useAuth'

const Page = async () => {
  await useAuth()

  return <div>Dashboard</div>
}
export default Page
