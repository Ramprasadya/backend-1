import { cookies } from 'next/headers'
import Dashboard from '@/components/pages/Dashboard'
import { redirect } from 'next/navigation'


const page = async() => {
   const cookieStore = await cookies()
   const token = cookieStore.get("token")?.value

     if (!token) {
    redirect("/login")
  }

  return (
   <Dashboard />
  )
}

export default page