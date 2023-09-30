// import { type LoginUserResponse } from '../models'

const URL = 'http://localhost:3000/api/login'

interface User {
  identifier: string
  password: string
}

const loginUser = async ({ identifier, password }: User): Promise<string> => {
  if (identifier === '' || password === '') return 'Por favor, ingrese todos los datos'

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

    return await res.text()
  } catch (error) {
    console.log('Error checking user', error)
    return 'Hubo un error al iniciar sesión'
  }
}

export default loginUser
