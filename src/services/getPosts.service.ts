import { type Post } from '@/models'
import { getCookie } from '@/utils'
import { cookies } from 'next/headers'

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
      token = cookies().get('session_cookie')?.value
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
