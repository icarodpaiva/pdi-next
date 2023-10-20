"use client"

import { useRouter } from "next/navigation"

import { MessageModal } from "../MessageModal"

import { useMessagesModal } from "@/hooks/useMessagesModal"

import style from "./DeletePage.module.css"

interface DeletePage {
  slug: string
}

export const DeletePage = ({
  slug,
  children
}: React.PropsWithChildren<DeletePage>) => {
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

    if (response.status === 204) {
      refresh()
    } else {
      handleOpenMessageModal({
        title: "Erro",
        message: "Erro ao deletar página"
      })
    }
  }

  return (
    <>
      <button className={style.deletePageButton} onClick={handleOpenModal}>
        {children}
      </button>

      <MessageModal {...modalProps} />
    </>
  )
}
