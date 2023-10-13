"use client"

import { useState, useRef } from "react"

import { useRouter } from "next/navigation"

import { Modal } from "./[slug]/components/Modal"
import { Preview } from "./[slug]/components/Preview/Preview"
import { AddSectionButton } from "./[slug]/components/AddSectionButton/AddSectionButton"
import { Section } from "./[slug]/components/Section/Section"

import { pageSections } from "./[slug]/helpers/sections"
import { addArrayItem } from "./[slug]/utils/addArrayItem"

import style from "./page.module.css"

type MessageModalContent = {
  title: string
  message: string
  button?: {
    label: string
    action: () => void
  }
}

const initialMessageModalContent: MessageModalContent = {
  title: "",
  message: ""
}

export interface ISection {
  section: string
  formData: object
}

export default function Editor() {
  const [isSectionsModalOpen, setIsSectionsModalOpen] = useState(false)

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [messageModalContent, setMessageModalContent] =
    useState<MessageModalContent>(initialMessageModalContent)

  const [pageSectionIndex, setPageSectionIndex] = useState(0)
  const [sections, setSections] = useState<ISection[]>([])

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
      return handleOpenMessageModal({
        title: "Erro",
        message: "A página deve ter pelo menos uma seção"
      })
    }

    handleOpenMessageModal({
      title: "Confirmação",
      message: "Deseja salvar a página?",
      button: {
        label: "Sim",
        action: handleSavePage
      }
    })
  }

  const handleSavePage = async () => {
    const slug = encodeURIComponent(slugRef.current?.value ?? "")

    const response = await fetch("http://localhost:3001/pages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ slug, sections })
    })

    if (response.status === 201) {
      return push(`/lp/${slug}`)
    }

    const error: PagesRequestError = await response.json()

    if (error.message.includes("already exists")) {
      slugRef.current?.focus()

      return handleOpenMessageModal({
        title: "Erro",
        message: "Já existe uma página com esse nome"
      })
    }

    return handleOpenMessageModal({
      title: "Erro",
      message: "Falha ao salvar a página"
    })
  }

  const handleOpenMessageModal = (modalContent: MessageModalContent) => {
    setMessageModalContent(modalContent)
    setIsMessageModalOpen(true)
  }

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false)
  }

  return (
    <main className={style.main}>
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

      <Preview sections={sections} />
    </main>
  )
}
