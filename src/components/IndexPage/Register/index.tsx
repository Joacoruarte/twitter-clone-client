'use client'

import { useState } from 'react'
import { FirstStep } from './components'
import s from './index.module.scss'
import { type CustomEvent, type NewUser } from './models'
import SecondStep from './components/SecondStep/SecondStep'

export default function RegisterModal () {
  const [steps, setSteps] = useState(1)
  const [user, setUser] = useState<NewUser>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    birthday: 0
  })

  const handleSetUser = (
    e: React.ChangeEvent<HTMLInputElement> | CustomEvent
  ) => {
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleNextStep = () => {
    setSteps(steps + 1)
  }

  return (
    <div className={s.container_register_modal}>
      <div className={s.container_steps}>
        <p>Paso {steps} de 2</p>
      </div>

      <form className={s.register_form}>
        {steps === 1 && (
          <FirstStep
            user={user}
            onChargeUserData={handleSetUser}
            onNextStep={handleNextStep}
          />
        )}

        {steps === 2 && (
          <SecondStep onChargeUserData={handleSetUser} user={user} />
        )}
      </form>
    </div>
  )
}
