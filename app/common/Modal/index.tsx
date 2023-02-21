'use client'

import { useEffect, useRef } from 'react'

import Box from 'app/common/Box'
import { useModal } from 'context/ModalContext'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { ModalParams } from 'types/Modal'

import styles from './Modal.module.scss'

const Modal = ({ children }: ModalParams) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { closeModal } = useModal()

  const onEscKeyUpEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal()

      return
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', onEscKeyUpEvent)
    const body = document.querySelector('body') as HTMLBodyElement

    if (body) {
      body.style.overflowY = 'hidden'
    }

    return () => {
      document.removeEventListener('keyup', onEscKeyUpEvent)

      if (body) {
        body.style.overflowY = 'auto'
      }
    }
  }, [])

  useOnClickOutside(modalRef, closeModal)

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.modal} ref={modalRef}>
        <Box className={styles.box}>{children}</Box>
      </div>
    </>
  )
}

export default Modal
