'use client'
import InputForm from '@/components/Inputs/InputForm/InputForm'
import s from './SecondStep.module.scss'
import { type CustomEvent, type NewUser } from '../../models'
import ActionButton from '@/components/Buttons/ActionButton'
import { registerUser } from '../../services'
import { useRouter } from 'next/navigation'

interface Props {
  onChargeUserData: (
    e: React.ChangeEvent<HTMLInputElement> | CustomEvent
  ) => void
  user: NewUser
}

export default function SecondStep ({ onChargeUserData, user }: Props) {
  const router = useRouter()

  const handleDisabledSecondStep = () => {
    if (
      user.password !== '' &&
      user.passwordConfirmation !== '' &&
      user.password === user.passwordConfirmation
    ) {
      return false
    }
    return true
  }

  const handleRegisterUser = async () => {
    const newUser = await registerUser(user)

    if (newUser.message === 'User created successfully') {
      router.push('/home')
    }
  }

  return (
    <div className={s.container_second_step}>
      <h4 className={s.second_step_title}>Crea tu contraseña</h4>

      <div className={s.container_second_step_inputs}>
        <InputForm
          value={user.password}
          required
          type='password'
          onChange={onChargeUserData}
          id='user_password'
          name='password'
        >
          Contraseña
        </InputForm>

        <InputForm
          value={user.passwordConfirmation}
          required
          type='password'
          onChange={onChargeUserData}
          id='user_password_confirmation'
          name='passwordConfirmation'
        >
          Confirmar contraseña
        </InputForm>
      </div>
      <div className={s.container_register_user}>
        <ActionButton
          text='Registrarse'
          handleClick={handleRegisterUser}
          disabled={handleDisabledSecondStep()}
          padding='1.1rem 1rem'
        />
      </div>
    </div>
  )
}
