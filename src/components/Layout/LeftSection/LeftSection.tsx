'use client'
import { useLogout } from '@/hooks'
import s from './LeftSection.module.scss'
import { Twitter } from '../../../../public/icons'
import { RiHome4Fill, RiNotificationLine } from 'react-icons/ri'
import { HiOutlineSearch, HiOutlineMail } from 'react-icons/hi'
import { CgList, CgMoreO } from 'react-icons/cg'
import { FaRegBookmark, FaUser } from 'react-icons/fa'
import { TfiMoreAlt } from 'react-icons/tfi'
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import { toCapitalizeCase } from '@/utils'
import ActionButton from '@/components/Buttons/ActionButton'
import { useState } from 'react'

export default function LeftSection () {
  const { signOut } = useLogout()
  const [dropdown, setDropdown] = useState(false)
  const user = useAppSelector((state) => state.auth.user)

  const handleOpenDropdown = () => {
    setDropdown(!dropdown)
  }

  return (
    <div className={s.container_left_section}>
      <Twitter className={s.twitter__logo} />
      <ul className={s.container_navigation_options}>
        <li className={s.navigation_option}>
          <RiHome4Fill className={s.navigation_option__icon} />
          <p>Inicio</p>
        </li>
        <li className={s.navigation_option}>
          <HiOutlineSearch className={s.navigation_option__icon} />
          <p>Explorar</p>
        </li>
        <li className={s.navigation_option}>
          <RiNotificationLine className={s.navigation_option__icon} />
          <p>Notificaciones</p>
        </li>
        <li className={s.navigation_option}>
          <HiOutlineMail className={s.navigation_option__icon} />
          <p>Mensajes</p>
        </li>
        <li className={s.navigation_option}>
          <CgList className={s.navigation_option__icon} />
          <p>Listas</p>
        </li>
        <li className={s.navigation_option}>
          <FaRegBookmark className={s.navigation_option__icon} />
          <p>Guardados</p>
        </li>
        <li className={s.navigation_option}>
          <Twitter className={s.twitter__logo_verified} />
          <p>Verificado</p>
        </li>
        <li className={s.navigation_option}>
          <FaUser className={s.navigation_option__icon} />
          <p>Perfil</p>
        </li>
        <li className={s.navigation_option}>
          <CgMoreO className={s.navigation_option__icon} />
          <p>Más opciones</p>
        </li>
        <li className={s.navigation_option__post}>
          <ActionButton text='Postear' />
        </li>
      </ul>
      {/* <button onClick={signOut}>Sign out</button> */}

      <div className={s.container_of_container_user_profile}>
        <div className={s.container_user_profile} onClick={handleOpenDropdown}>
          <div className={dropdown ? s.dropdown_open : s.dropdown_close}>
            <ul className={s.dropdown_list}>
              <li className={s.dropdown_list__item}>
                Agregar una cuenta existente
              </li>
              <li className={s.dropdown_list__item} onClick={signOut}>
                Cerrar la sesión de {user?.user_handle}
              </li>
            </ul>
          </div>
          <Image
            width={50}
            height={50}
            src={user?.user_picture}
            className={s.user_profile__avatar}
            alt='user profile'
          />
          <div className={s.user_profile_data}>
            <p>{`${toCapitalizeCase(user?.first_name)} ${toCapitalizeCase(
              user?.last_name
            )}`}</p>
            <span>{user?.user_handle}</span>
          </div>

          <div className={s.more_icon_container}>
            <TfiMoreAlt className={s.more_icon} />
          </div>
        </div>
      </div>
    </div>
  )
}
