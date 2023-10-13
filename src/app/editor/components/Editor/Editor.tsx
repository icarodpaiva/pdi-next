"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

import { AddSectionButton } from "../AddSectionButton"
import { Modal } from "../Modal"
import { Section } from "../Section"

import { pageSections } from "@/app/helpers/sections"
import { addArrayItem } from "../../utils/addArrayItem"

import type { ISection } from "@/app/types/PagesRequests"
import type { RequestError } from "@/app/types/PagesRequests"

import style from "./Editor.module.css"

interface EditorProps {
  sections: ISection[]
  setSections: React.Dispatch<React.SetStateAction<ISection[]>>
  editingPageSlug?: string
}

type MessageModalContent = {
  title: string
  message: string
  button?: {
    label: string
    action: () => Promise<void>
  }
}

const initialMessageModalContent: MessageModalContent = {
  title: "",
  message: ""
}

export const Editor = ({
  sections,
  setSections,
  editingPageSlug
}: EditorProps) => {
  const [isSectionsModalOpen, setIsSectionsModalOpen] = useState(false)

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [messageModalContent, setMessageModalContent] =
    useState<MessageModalContent>(initialMessageModalContent)

  const [pageSectionIndex, setPageSectionIndex] = useState(0)

  const slugRef = useRef<HTMLInputElement | null>(null)

  const { push } = useRouter()

  const handleOpenSectionsModal = (index: number) => {
    setIsSectionsModalOpen(true)
    setPageSectionIndex(index)
  }

  const handleCloseSectionsModal = () => {
    setIsSectionsModalOpen(false)
  }

  const addPageSection = (pageSectionData: ISection, index: number) => {
    setSections(prevPageSectionsData =>
      addArrayItem(prevPageSectionsData, index, pageSectionData)
    )
  }

  const handleChooseSection = (section: string) => {
    addPageSection({ section, formData: {} }, pageSectionIndex)
    handleCloseSectionsModal()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (sections.length === 0) {
      handleOpenMessageModal({
        title: "Erro",
        message: "A página deve ter pelo menos uma seção"
      })
    } else {
      handleOpenMessageModal({
        title: "Confirmação",
        message: "Deseja salvar a página?",
        button: {
          label: "Sim",
          action: editingPageSlug ? handleEditPage : handleCreatePage
        }
      })
    }
  }

  const handleEditPage = async () => {
    await createOrEditPage({ isCreating: false })
  }

  const handleCreatePage = async () => {
    await createOrEditPage({ isCreating: true })
  }

  const createOrEditPage = async ({ isCreating }: { isCreating: boolean }) => {
    const slug = slugRef.current?.value ?? ""

    const method = isCreating ? "POST" : "PUT"

    const url = isCreating
      ? "http://localhost:3001/pages/"
      : `http://localhost:3001/pages/${editingPageSlug}`

    const body = JSON.stringify({ slug, sections })

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body
    })

    if (response.status === (isCreating ? 201 : 204)) {
      push(`/lp/${slug}`)
    } else {
      const error: RequestError = await response.json()

      if (error.message.includes("already exists")) {
        slugRef.current?.focus()

        handleOpenMessageModal({
          title: "Erro",
          message: "Já existe uma página com esse nome"
        })
      } else {
        handleOpenMessageModal({
          title: "Erro",
          message: `Falha ao ${isCreating ? "criar" : "editar"} a página`
        })
      }
    }
  }

  const handleOpenMessageModal = (modalContent: MessageModalContent) => {
    setMessageModalContent(modalContent)
    setIsMessageModalOpen(true)
  }

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false)
  }

  return (
    <div className={style.editorContainer}>
      <h1 className={style.gridTitle}>Editor</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="page-slug">Nome da Página: </label>

          <input
            id="page-slug"
            name="page-slug"
            type="text"
            placeholder="Nome da Página"
            autoComplete="off"
            required
            ref={slugRef}
            value={editingPageSlug}
          />
        </div>

        {sections.length === 0 ? (
          <AddSectionButton
            handleOpenSectionsModal={handleOpenSectionsModal}
            sectionIndex={0}
          />
        ) : (
          <>
            {sections.map((section, index) => (
              <Section
                key={index}
                handleOpenSectionsModal={handleOpenSectionsModal}
                index={index}
                section={section}
                sectionsLength={sections.length}
                addPageSection={addPageSection}
                setSections={setSections}
              />
            ))}
          </>
        )}

        <button type="submit">Salvar Página</button>
      </form>

      {isSectionsModalOpen && (
        <Modal title="Seções" onClose={handleCloseSectionsModal}>
          <ul className={style.sectionsContainer}>
            {pageSections.map(pageSection => (
              <li key={pageSection}>
                <button onClick={() => handleChooseSection(pageSection)}>
                  {pageSection}
                </button>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {isMessageModalOpen && (
        <Modal
          title={messageModalContent.title}
          onClose={handleCloseMessageModal}
        >
          <p>{messageModalContent.message}</p>

          {messageModalContent.button && (
            <button onClick={messageModalContent.button.action}>
              {messageModalContent.button.label}
            </button>
          )}
        </Modal>
      )}
    </div>
  )
}
