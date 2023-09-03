export const getCookie = (cookieName: string) => {
  if (cookieName === undefined || typeof window === 'undefined') {
    return ''
  }
  const nombre = cookieName + '='
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()

    if (cookie.indexOf(nombre) === 0) {
      return cookie.substring(nombre.length, cookie.length)
    }
  }

  return null // Si la cookie no se encuentra
}

export const deleteCookie = (cookieName: string) => {
  if (cookieName === undefined || typeof window === 'undefined') {
    return ''
  }
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
