import useAuth from '@/hooks/useAuth'

const Page = async () => {
  await useAuth('dashboard')

  return <div>Dashboard</div>
}
export default Page
