import React, { useEffect } from 'react'
import s from './index.module.scss'
import { AiOutlineClose } from 'react-icons/ai'

interface Props {
  children: React.ReactNode
  closeModal: () => void
  isOpen: boolean
}

export default function Modal ({ children, closeModal, isOpen }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      {isOpen && (
        <>
          <div className={s.modal__overley} onClick={closeModal} />
          <div className={s.modal__content}>
            <AiOutlineClose
              className={s.modal__closeIcon}
              onClick={closeModal}
            />
            {children}
          </div>
        </>
      )}
    </>
  )
}
