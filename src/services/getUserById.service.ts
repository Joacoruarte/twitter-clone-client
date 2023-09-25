import { type User } from '@/models'
import { getCookie } from '@/utils'
import { cookies } from 'next/headers'

async function getCookieData (
  cookieName: string
): Promise<string | undefined> {
  const cookieData = cookies().get(cookieName)?.value
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}

const URL = `${process.env.BACKEND_URL}/users`

export const getUserById = async (id: string): Promise<User> => {
  try {
    const isWindowExist = typeof window !== 'undefined'

    let token: string | undefined | null
    if (!isWindowExist) {
      token = await getCookieData('session_cookie')
    } else {
      token = getCookie('session_cookie')
    }

    if (token === null || token === undefined) throw new Error('No token')

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const response = await fetch(`${URL}/${id}`, config)
    const responseToReturn = await response.json()
    return responseToReturn?.user
  } catch (error: any) {
    console.log(error)
    throw error.message
  }
}
