import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Twitter } from '../../../../../public/icons'
import s from './index.module.scss'
import ActionButton from '@/components/Buttons/ActionButton'
import IdentifyUser from './components/IdentifyUser'
import identifyUser from './services/identifyUser.service'
import InputForm from '@/components/Inputs/InputForm/InputForm'
import { type IdentifyUserResponse, type User } from './models'
import loginUser from './services/login.service'

export default function LoginModal () {
  const router = useRouter()
  const [user, setUser] = useState<User>({
    identified: false,
    identifier: '',
    type: ''
  })
  const [password, setPassword] = useState('')

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ identified: false, identifier: e.target.value, type: '' })
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleCheckIfUserExist = async () => {
    const response: IdentifyUserResponse = await identifyUser({ user })

    if (response?.identified && response.type !== undefined) {
      const { identified, type } = response

      setUser((prevState: User) => ({
        ...prevState,
        identified,
        type
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = await loginUser({ identifier: user.identifier, password })

    if (message === 'You are logged in') {
      router.push('/home')
    } else {
      alert('No se pudo iniciar sesión')
    }
  }

  return (
    <div className={user.identified ? s.login_step2 : s.login}>
      <div className={s.twitter}>
        <Twitter className={s.twitter__logo} />
      </div>

      <h4 className={s.login__title}>
        {user.identified ? 'Introduce tu contraseña' : 'Inicia sesión en X'}
      </h4>

      <form onSubmit={handleSubmit} className={s.login__form}>
        {!user.identified && <IdentifyUser />}

        <InputForm
          onChange={handleUser}
          value={user.identifier}
          type='text'
          id='user'
          required
        >
          {
            user.identified
              ? user.type
              : 'Teléfono, correo electrónico o usuario'
          }
          </InputForm>

        {user.identified && (
          <InputForm
            onChange={handlePassword}
            value={password}
            type='password'
            id='password'
            required
          >
            Contraseña
            </InputForm>
        )}

        {!user.identified
          ? (
          <>
            <ActionButton
              text='Siguiente'
              backgroundColor='#fff'
              color='#000'
              hoverBackgroundColor='#e6e6e6'
              handleClick={handleCheckIfUserExist}
            />
            <ActionButton
              text='¿Olvidaste tu contraseña?'
              backgroundColor='transparent'
              color='#fff'
              border='1px solid rgb(83, 100, 113)'
              hoverBackgroundColor='rgba(83, 100, 113, 0.3)'
            />
            <p className={s.login__form__redirectToRegister}>
              ¿No tienes una cuenta? <a>Regístrate</a>
            </p>
          </>
            )
          : (
          <div className={s.login_form_container_singIn}>
            <ActionButton
              text='Iniciar sesión'
              backgroundColor='#fff'
              color='#000'
              hoverBackgroundColor='#e6e6e6'
              type='submit'
            />
            <p className={s.login__form__redirectToRegister}>
              ¿No tienes una cuenta? <a>Regístrate</a>
            </p>
          </div>
            )}
      </form>
    </div>
  )
}
