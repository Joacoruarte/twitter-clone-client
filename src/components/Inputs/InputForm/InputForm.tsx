import React from 'react'
import s from './InputForm.module.scss'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  type: string
  placeholder?: string
  id: string
  children?: React.ReactNode
  required?: boolean
  name?: string
}

export default function InputForm ({ onChange, value, type, placeholder, id, children, required, name }: Props) {
  return (
    <div className={s.login__form__input__container}>
      <input
        className={s.login__form__input}
        id={id}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        required={required}
        name={name}
      />
      <label className={s.login__form__label} htmlFor={id}>
        {children}
      </label>
    </div>
  )
}
