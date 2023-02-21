export interface ModalParams {
  children: React.ReactNode
}

export interface ModalPropsContext {
  openModal: (arg: React.ReactNode) => void
  closeModal: () => void
}
