"use client"

import { Modal } from "../Modal"

import type { MessageModalContent } from "../../../hooks/useMessagesModal"

import style from "./MessageModal.module.css"

interface MessageModalProps {
  isMessageModalOpen: boolean
  messageModalContent: MessageModalContent
  handleCloseMessageModal: () => void
}

export const MessageModal = ({
  isMessageModalOpen,
  messageModalContent,
  handleCloseMessageModal
}: MessageModalProps) => {
  if (!isMessageModalOpen) {
    return null
  }

  return (
    <Modal title={messageModalContent.title} onClose={handleCloseMessageModal}>
      <p className={style.message}>{messageModalContent.message}</p>

      {messageModalContent.button && (
        <button
          onClick={messageModalContent.button.action}
          className={style.button}
        >
          {messageModalContent.button.label}
        </button>
      )}
    </Modal>
  )
}
