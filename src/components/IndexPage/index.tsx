'use client'
import ConnectWithProvider from '@/components/IndexPage/ConnectWithProvider'
import { Twitter } from '../../../public/icons'
import s from '@/app/page.module.scss'
import { AiFillApple } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import ActionButton from '@/components/Buttons/ActionButton'
import Footer from '@/components/IndexPage/Footer'
import Modal from '@/components/Modal'
import LoginModal from '@/components/IndexPage/Login'
import OrOption from '@/components/IndexPage/OrOption'
import RegisterModal from '@/components/IndexPage/Register'
import { Archivo } from 'next/font/google'
import { useState } from 'react'

const kanit = Archivo({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function IndexPageClient () {
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)

  return (
    <main className={s.home}>
    <div className={s.container_main_info}>
      <div className={s.twitter}>
        <Twitter className={s.twitter__logo} key='desktop' />
      </div>

      <div className={s.presentation}>
        <Twitter className={s.twitter__logo__mobile} key='mobile' />
        <h1 className={`${s.presentation__title} ${kanit.className}`}>
          Lo que está pasando ahora
        </h1>
        <h2 className={`${s.presentation__subtitle} ${kanit.className}`}>
          Join today.
        </h2>

        <div className={s.presentation__providerRegisterOptions}>
          <ConnectWithProvider
            text='Registrarse'
            icon={<FcGoogle />}
            provider='Apple'
          />
          <ConnectWithProvider
            text='Registrarse'
            icon={<AiFillApple />}
            provider='Google'
          />

          <OrOption />

          <ActionButton
            text='Crear cuenta'
            handleClick={() => { setOpenRegisterModal(true) }}
          />

          <p
            className={
              s.presentation__providerRegisterOptions__termsOfService
            }
          >
            Al registrarte, aceptas los <a>Términos de servicio</a> y la{' '}
            <a>Política de privacidad</a>, incluida la política de{' '}
            <a>Uso de Cookies</a>.
          </p>

          <div
            className={
              s.presentation__providerRegisterOptions__areYouHaveAccount
            }
          >
            <p>¿Ya tienes una cuenta?</p>
            <ActionButton
              text='Iniciar sesión'
              backgroundColor='transparent'
              border='1px solid rgb(83, 100, 113)'
              color='rgb(29, 155, 240)'
              hoverBackgroundColor='rgba(29, 155, 240, 0.1)'
              handleClick={() => { setOpenLoginModal(true) }}
            />
          </div>
        </div>
      </div>
    </div>

    <Footer />

    <Modal
      isOpen={openLoginModal}
      closeModal={() => { setOpenLoginModal(false) }}
      key={'login'}
    >
      <LoginModal />
    </Modal>
    <Modal
      isOpen={openRegisterModal}
      closeModal={() => { setOpenRegisterModal(false) }}
      key={'register'}
    >
      <RegisterModal />
    </Modal>
    </main>
  )
}
