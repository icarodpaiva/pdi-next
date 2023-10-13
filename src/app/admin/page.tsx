"use client"

import { useState, useRef } from "react"
import { AddCircle } from "@mui/icons-material"

import { useRouter } from "next/navigation"

import { Section } from "./components/Section"
import { Modal } from "./components/Modal"

import { pageSections, sectionComponents } from "./helpers/sections"
import { addArrayItem } from "./utils/addArrayItem"

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

export interface Section {
  section: string
  formData: object
}

export default function Admin() {
  const [isSectionsModalOpen, setIsSectionsModalOpen] = useState(false)

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [messageModalContent, setMessageModalContent] =
    useState<MessageModalContent>(initialMessageModalContent)

  const [pageSectionIndex, setPageSectionIndex] = useState(0)
  const [sections, setSections] = useState<Section[]>([])

  const slugRef = useRef<HTMLInputElement | null>(null)

  const { push } = useRouter()

  const handleOpenSectionsModal = (index: number) => {
    setIsSectionsModalOpen(true)
    setPageSectionIndex(index)
  }

  const handleCloseSectionsModal = () => {
    setIsSectionsModalOpen(false)
  }

  const addPageSection = (pageSectionData: Section, index: number) => {
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

    const slug = encodeURIComponent(slugRef.current?.value ?? "")

    if (!slug) {
      return handleOpenMessageModal({
        title: "Erro",
        message: "Nome da página não pode ser vazio"
      })
    }

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
    // refatorar o try catch usando fetch
    try {
      const slug = encodeURIComponent(slugRef.current?.value ?? "")

      await fetch("http://localhost:3001/pages/", {
        method: "POST",
        body: JSON.stringify({ slug, sections })
      })

      return push(`/lp/${slug}`)
    } catch (error: any) {
      if (error.response?.message?.includes("already exists")) {
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
        <hr className={style.divider} />

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

          {sections.length <= 0 ? (
            <button
              type="button"
              onClick={() => handleOpenSectionsModal(0)}
              className={style.addSectionButton}
            >
              <AddCircle />
            </button>
          ) : (
            sections.map((section, index) => (
              <div key={index} className={style.sectionContainer}>
                {index === 0 && (
                  <button
                    type="button"
                    onClick={() => handleOpenSectionsModal(index)}
                    className={style.addSectionButton}
                  >
                    <AddCircle />
                  </button>
                )}

                <Section
                  pageSectionData={section}
                  index={index}
                  isUpButtonDisabled={index === 0}
                  isDownButtonDisabled={index === sections.length - 1}
                  addPageSection={addPageSection}
                  setPageSectionsData={setSections}
                />

                <button
                  type="button"
                  onClick={() => handleOpenSectionsModal(index + 1)}
                  className={style.addSectionButton}
                >
                  <AddCircle />
                </button>
              </div>
            ))
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

      <div className={style.previewContainer}>
        <div className={style.previewContent}>
          <h1 className={style.gridTitle}>Pré-visualização</h1>
          <hr className={style.divider} />

          <div className={style.sectionsContainer}>
            {sections.map(({ section, formData: props }, index) => {
              const PageSectionComponent = sectionComponents[section]

              if (PageSectionComponent) {
                return <PageSectionComponent key={index} {...props} />
              }

              return null
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
