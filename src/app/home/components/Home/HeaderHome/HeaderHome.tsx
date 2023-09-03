import React from 'react'
import s from './HeaderHome.module.scss'
import { type SwitchSection, SwitchSectionEnum } from '../Home'

interface Props {
  switchSection: SwitchSection
  handleChangeSwitchSection: (section: SwitchSectionEnum) => void
}

export default function HeaderHome ({
  switchSection,
  handleChangeSwitchSection
}: Props) {
  return (
    <div className={s.container_header_section}>
      <h2 className={s.title_of_section}>Inicio</h2>

      <div className={s.container_switch_sections}>
        <button
          className={`${s.switch_section} ${
            switchSection === SwitchSectionEnum.FOR_YOU && s.active
          }`}
          onClick={() => {
            handleChangeSwitchSection(SwitchSectionEnum.FOR_YOU)
          }}
        >
          <p>Para ti</p>
        </button>
        <button
          className={`${s.switch_section} ${
            switchSection === SwitchSectionEnum.FOLLOWING && s.active
          }`}
          onClick={() => {
            handleChangeSwitchSection(SwitchSectionEnum.FOLLOWING)
          }}
        >
          <p>Siguiendo</p>
        </button>
      </div>
    </div>
  )
}
