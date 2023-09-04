import { type LoginUserResponse } from '../models'

const URL = `${process.env.BACKEND_URL}/users/login`

interface User {
  identifier: string
  password: string
}

const loginUser = async ({ identifier, password }: User): Promise<LoginUserResponse> => {
  if (identifier === '' || password === '') return { message: 'Por favor, ingrese todos los datos' }

  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' as RequestCredentials,
      body: JSON.stringify({ identifier, password })
    }
    const res = await fetch(URL, config)

    return await res.json()
  } catch (error) {
    console.log('Error checking user', error)
    return { message: 'Hubo un error al iniciar sesión' }
  }
}

export default loginUser
