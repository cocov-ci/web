'use client'

import classNames from 'classnames'
import { useEffect, useRef } from 'react'

import Box from 'app/common/Box'
import useModal from 'hooks/useModal'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { ModalParams } from 'types/Modal'

import styles from './Modal.module.scss'

const Modal = ({ children, visible = false }: ModalParams) => {
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

  useOnClickOutside(modalRef, () => {
    closeModal()
  })

  return (
    <>
      <div
        className={classNames(styles.overlay, {
          [styles.visible]: visible,
        })}
      />
      <div
        className={classNames(styles.modal, {
          [styles.visible]: visible,
        })}
        ref={modalRef}
      >
        <Box className={styles.box}>{children}</Box>
      </div>
    </>
  )
}

export default Modal
