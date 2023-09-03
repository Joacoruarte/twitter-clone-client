import { deleteCookie } from '@/utils'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const router = useRouter()

  const handleSignOut = () => {
    deleteCookie('set-cookie')
    router.push('/')
  }

  return { signOut: handleSignOut }
}
