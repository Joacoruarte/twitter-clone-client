import { type User } from '@/models'
import { cookies } from 'next/headers'

const URL = 'http://localhost:3001/users/context'

export const getUserByContext = async (): Promise<User> => {
  try {
    const token = cookies().get('set-cookie')?.value
    if (token === undefined || token === null) throw new Error('No token')
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const response = await fetch(URL, config)
    const responseToReturn = await response.json()
    return responseToReturn?.user
  } catch (error: any) {
    console.log(error)
    throw error.message
  }
}
