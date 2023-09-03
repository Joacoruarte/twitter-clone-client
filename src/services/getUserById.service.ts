import { type User } from '@/models'
import { getCookie } from '@/utils'
import { cookies } from 'next/headers'
const URL = 'http://localhost:3001/users'

export const getUserById = async (id: string): Promise<User> => {
  try {
    const isWindowExist = typeof window !== 'undefined'

    const token = !isWindowExist
      ? cookies().get('set-cookie')?.value
      : getCookie('set-cookie')

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
