import { useState } from "react"

export type MessageModalContent = {
  title: string
  message: string
  button?: {
    label: string
    action: () => Promise<void> | void
  }
}

const initialMessageModalContent: MessageModalContent = {
  title: "",
  message: ""
}

export const useMessagesModal = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [messageModalContent, setMessageModalContent] =
    useState<MessageModalContent>(initialMessageModalContent)

  const handleOpenMessageModal = (modalContent: MessageModalContent) => {
    setMessageModalContent(modalContent)
    setIsMessageModalOpen(true)
  }

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false)
  }

  return {
    isMessageModalOpen,
    messageModalContent,
    handleOpenMessageModal,
    handleCloseMessageModal
  }
}
