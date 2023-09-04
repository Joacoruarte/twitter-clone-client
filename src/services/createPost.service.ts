import { getCookie } from '@/utils'

const URL = `${process.env.BACKEND_URL}/tweets`

export const createPost = async ({
  userId,
  content
}: {
  userId: number
  content: string
}) => {
  try {
    const token = getCookie('set-cookie')
    if (token === null || token === undefined) throw new Error('No token')
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ user_id: userId, content })
    }
    const response = await fetch(URL, config)
    const data = await response.json()
    return data?.tweet
  } catch (error) {
    console.log(error)
  }
}
