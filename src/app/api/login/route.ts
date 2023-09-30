const URL = `${process.env.BACKEND_URL}/users/login`

export async function POST (request: Request) {
  const { identifier, password } = await request.json()

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify({ identifier, password })
  }
  const requestBackend = await fetch(URL, config)

  let cookie = requestBackend.headers.get('set-cookie') as string

  cookie = cookie.split(';')[0].split('=')[1]

  const currentDate = new Date()

  const expirationDate = new Date(
    currentDate.getFullYear() + 10,
    currentDate.getMonth(),
    currentDate.getDate()
  )

  const expirationDateString = expirationDate.toUTCString()

  const data = await requestBackend.json()

  return new Response(data.message, {
    status: 200,
    headers: {
      'Set-Cookie': `session_cookie=${cookie}; Path=/; expires=${expirationDateString};`
    }
  })
}
