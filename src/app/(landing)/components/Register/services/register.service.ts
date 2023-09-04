import { type NewUser } from '../models'

const URL = `${process.env.BACKEND_URL}/users/register`

const registerUser = async (user: NewUser) => {
  try {
    const formatedBirthday = new Date(user.birthday).toISOString().split('T')[0]

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' as RequestCredentials,
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        birthday: formatedBirthday,
        password: user.password
      })
    }

    const req = await fetch(URL, config)
    return await req.json()
  } catch (error) {
    console.log('ERROR AL CREAR UN USUARIO', error)
  }
}

export default registerUser
