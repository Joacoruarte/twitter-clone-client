import React from 'react'
import s from './index.module.scss'

interface Props {
  icon?: JSX.Element
  provider: string
  text: string
}

export default function ConnectWithProvider ({ icon, provider, text }: Props) {
  return (
    <button className={s.connect}>
      <span className={s.connect__icon}>{icon}</span>
      <p className={s.connect__text}>
        {text} con <span className={s.connect__provider}>{provider}</span>
      </p>
    </button>
  )
}
