'use client'

import React, { createContext, useMemo, useState } from 'react'

import Modal from 'app/common/Modal'
import { ModalPropsContext } from 'types/Modal'

export const ModalContext = createContext<ModalPropsContext>({
  openModal: () => null,
  closeModal: () => null,
})

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [initModal, setInitModal] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [content, setContent] = useState<React.ReactNode>()

  const openModal = (content: React.ReactNode) => {
    setInitModal(true)
    setContent(content)

    setTimeout(() => {
      setIsVisible(true)
    }, 100)
  }

  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => {
      setInitModal(false)
      setContent(null)
    }, 150)
  }

  const memoizedValue = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal],
  )

  return (
    <ModalContext.Provider value={memoizedValue}>
      {children}
      {initModal && <Modal visible={isVisible}>{content}</Modal>}
    </ModalContext.Provider>
  )
}

export default ModalProvider
