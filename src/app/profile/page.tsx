import { type User } from '@/models'
import { store } from '@/redux/store'
import { setUser } from '@/redux/features/authSlice'
import { getUserByContext } from '@/services'

export default async function HomePage () {
  let currentUser: User | null = null

  try {
    currentUser = await getUserByContext()
  } catch (error) {
    console.log(error)
  }

  if (currentUser !== null) {
    store.dispatch(setUser(currentUser))
  }

  return (
    <div>
        Profile page

        <pre>
            {JSON.stringify(store.getState().auth.user, null, 2)}
        </pre>
    </div>
  )
}
