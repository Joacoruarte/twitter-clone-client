import InputForm from '@/components/Inputs/InputForm/InputForm'
import s from './FirstStep.module.scss'
import { type CustomEvent, type NewUser } from '../../models'
import SelectBirthDay from './SelectBirthDay'
import ActionButton from '@/components/Buttons/ActionButton'

interface Props {
  onChargeUserData: (e: React.ChangeEvent<HTMLInputElement> | CustomEvent) => void
  onNextStep: () => void
  user: NewUser
}

export default function FirstStep ({ onChargeUserData, user, onNextStep }: Props) {
  const handleDisabledFirstStep = () => {
    if (user.first_name !== '' && user.last_name !== '' && user.email !== '' && user.birthday !== 0) {
      return false
    }
    return true
  }

  return (
    <div className={s.container_first_step}>
      <h4 className={s.first_step_title}>Crea tu cuenta</h4>
      <div className={s.first_step_inputs}>
        <div className={s.first_step_inputs_flex_row}>
          <InputForm
            value={user.first_name}
            required
            type='text'
            onChange={onChargeUserData}
            id='user_name'
            name='first_name'
          >
            Nombre
          </InputForm>
          <InputForm
            value={user.last_name}
            required
            type='text'
            onChange={onChargeUserData}
            id='user_name'
            name='last_name'
          >
            Appelido
          </InputForm>
        </div>

        <InputForm
          value={user.email}
          required
          type='text'
          onChange={onChargeUserData}
          id='user_email'
          name='email'
        >
          Correo electrónico
        </InputForm>

        <div className={s.first_step_birthday_container}>
          <h5>Fecha de nacimiento</h5>
          <p>
            Esta información no será pública. Confirma tu propia edad, incluso
            si esta cuenta es para una empresa, una mascota u otra cosa.
          </p>

          <div className={s.first_step_birthday_inputs}>
            <SelectBirthDay onChargeUserData={onChargeUserData} />
          </div>
        </div>
        <div className={s.container_next_step}>
          <ActionButton
            type='button'
            text='Siguiente'
            disabled={handleDisabledFirstStep()}
            handleClick={onNextStep}
            padding='1.1rem 1rem'
            backgroundColor='#fff'
            color='#000'
            hoverBackgroundColor='#e6e6e6'
            border='none'
            fontSize='1rem'
          />
        </div>
      </div>
    </div>
  )
}
