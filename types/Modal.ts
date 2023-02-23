import React from 'react'

export interface ModalParams {
  visible?: boolean
  children: React.ReactNode
}

export interface ModalPropsContext {
  openModal: (arg: React.ReactNode) => void
  closeModal: () => void
}
