import { useContext } from 'react'

import { ModalContext } from 'context/ModalContext'

const useModal = () => useContext(ModalContext)

export default useModal
