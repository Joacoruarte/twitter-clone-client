import { type IdentifyUserResponse } from '../models'

interface User {
  identifier: string
}

interface Props {
  user: User
}

const URL = 'http://localhost:3001/users/checks'

const identifyUser = async ({ user }: Props): Promise<IdentifyUserResponse> => {
  const { identifier } = user
  if (identifier === '') {
    return { identified: false, type: undefined }
  }

  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier })
    }
    const req = await fetch(URL, config)
    return await req.json()
  } catch (error) {
    console.log('Error checking user', error)
    return { identified: false, type: undefined }
  }
}

export default identifyUser
