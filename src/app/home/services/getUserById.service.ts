import { type User } from '@/models'

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await fetch(`http://localhost:3001/users/${id}`)
    const responseToReturn = await response.json()
    return responseToReturn?.user
  } catch (error: any) {
    console.log(error)
    throw error.message
  }
}
