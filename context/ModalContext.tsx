'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'

import Modal from 'app/common/Modal'
import { ModalPropsContext } from 'types/Modal'

const ModalContext = createContext<ModalPropsContext>({
  openModal: () => null,
  closeModal: () => null,
})

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false)
  const [content, setContent] = useState<React.ReactNode>()

  const openModal = (content: React.ReactNode) => {
    setShow(true)
    setContent(content)
  }

  const closeModal = () => {
    setShow(false)
    setContent(null)
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
      {show && <Modal>{content}</Modal>}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)

export default ModalProvider
