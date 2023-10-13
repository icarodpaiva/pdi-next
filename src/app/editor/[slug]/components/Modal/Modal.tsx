import { Close } from "@mui/icons-material"

import type { PropsWithChildren } from "react"

import style from "./Modal.module.css"

interface ModalProps {
  title: string
  onClose: () => void
}

export const Modal = ({
  title,
  onClose,
  children
}: PropsWithChildren<ModalProps>) => {
  return (
    <div className={style.modalContainer}>
      <div className={style.modalContent}>
        <div className={style.titleContainer}>
          <h2>{title}</h2>
          <button onClick={onClose}>
            <Close />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}
