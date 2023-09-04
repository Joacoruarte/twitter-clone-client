import { type Post } from '@/models'
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

const URL = `${process.env.BACKEND_URL}/tweets`

interface GetPostsProps {
  limit?: number
  offset?: number
}

const getPosts = async ({ limit = 20, offset = 0 }: GetPostsProps): Promise<Post[]> => {
  try {
    const isWindowExist = typeof window !== 'undefined'

    let token: string | undefined | null
    if (!isWindowExist) {
      token = await getCookieData('set-cookie')
    } else {
      token = getCookie('set-cookie')
    }

    if (token === null || token === undefined) throw new Error('No token')

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const response = await fetch(`${URL}?offset=${offset}&limit=${limit}`, config)

    if (response.status === 401) {
      throw new Error('Unauthorized')
    }
    const responseToReturn = await response.json()
    return responseToReturn?.tweets
  } catch (error: any) {
    throw error.message
  }
}

export default getPosts
