import { type Post } from '@/models'
import { getCookie } from '@/utils'
import { cookies } from 'next/headers'

const URL = 'http://localhost:3001/tweets'

interface GetPostsProps {
  limit?: number
  offset?: number
}

const getPosts = async ({ limit = 20, offset = 0 }: GetPostsProps): Promise<Post[]> => {
  try {
    const isWindowExist = typeof window !== 'undefined'

    const token = !isWindowExist
      ? cookies().get('set-cookie')?.value
      : getCookie('set-cookie')

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
