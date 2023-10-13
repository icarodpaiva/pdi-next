"use client"

import { useRouter } from "next/navigation"

import { MessageModal } from "../MessageModal"

import { useMessagesModal } from "@/app/hooks/useMessagesModal"

import style from "./DeletePageButton.module.css"

interface DeletePageButtonProps {
  slug: string
}

export const DeletePageButton = ({ slug }: DeletePageButtonProps) => {
  const { refresh } = useRouter()
  const { handleOpenMessageModal, ...modalProps } = useMessagesModal()

  const handleOpenModal = () => {
    handleOpenMessageModal({
      title: "Confirmação",
      message: `Deseja excluir a página "${slug}" ?`,
      button: {
        label: "Sim",
        action: handleDeletePage
      }
    })
  }

  const handleDeletePage = async () => {
    const response = await fetch(`http://localhost:3001/pages/${slug}`, {
      method: "DELETE"
    })

    if (response.status !== 204) {
      handleOpenMessageModal({
        title: "Erro",
        message: "Erro ao deletar página"
      })
    } else {
      refresh()
    }
  }

  return (
    <>
      <button className={style.deletePageButton} onClick={handleOpenModal}>
        Deletar
      </button>

      <MessageModal {...modalProps} />
    </>
  )
}
