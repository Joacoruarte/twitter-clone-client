export interface IdentifyUserResponse {
  identified: boolean
  type: 'Correo electrónico' | 'Teléfono' | 'Usuario' | undefined
}

export interface User {
  identifier: string
  identified: boolean
  type: 'Correo electrónico' | 'Teléfono' | 'Usuario' | ''
}

export interface LoginUserResponse {
  message: string
  token?: string
}
