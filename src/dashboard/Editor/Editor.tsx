"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

import { AddSection } from "@/components/_client/AddSection"
import { Modal } from "@/components/_client/Modal"
import { Section } from "@/components/_client/Section"
import { MessageModal } from "@/components/_client/MessageModal"

import { sectionsNames } from "@/helpers/sectionsData"
import { useMessagesModal } from "@/hooks/useMessagesModal"
import { addArrayItem } from "@/utils/addArrayItem"

import type { Component } from "@/types/PagesRequests"
import type { RequestError } from "@/types/PagesRequests"

import style from "./Editor.module.css"

interface EditorProps {
  sections: Component[]
  setSections: React.Dispatch<React.SetStateAction<Component[]>>
  editingPageSlug?: string
}

export const Editor = ({
  sections,
  setSections,
  editingPageSlug
}: EditorProps) => {
  const [isSectionsModalOpen, setIsSectionsModalOpen] = useState(false)
  const [pageSectionIndex, setPageSectionIndex] = useState(0)

  const slugRef = useRef<HTMLInputElement | null>(null)

  const { push } = useRouter()
  const { handleOpenMessageModal, ...modalProps } = useMessagesModal()

  const handleOpenSectionsModal = (index: number) => {
    setIsSectionsModalOpen(true)
    setPageSectionIndex(index)
  }

  const handleCloseSectionsModal = () => {
    setIsSectionsModalOpen(false)
  }

  const addSection = (pageSection: Component, index: number) => {
    setSections(prevPageSections =>
      addArrayItem(prevPageSections, index, pageSection)
    )
  }

  const handleChooseSection = (section: string) => {
    addSection({ section, formData: {} }, pageSectionIndex)
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
      setTimeout(() => {
        push(`/page/${slug}`)
      }, 1000)
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
            defaultValue={editingPageSlug}
          />
        </div>

        {sections.length === 0 ? (
          <AddSection
            index={0}
            handleOpenSectionsModal={handleOpenSectionsModal}
          />
        ) : (
          <>
            {sections.map((section, index) => (
              <Section
                key={index}
                index={index}
                section={section}
                sectionsLength={sections.length}
                handleOpenSectionsModal={handleOpenSectionsModal}
                addSection={addSection}
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
            {sectionsNames.map(sectionsName => (
              <li key={sectionsName}>
                <button onClick={() => handleChooseSection(sectionsName)}>
                  {sectionsName}
                </button>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      <MessageModal {...modalProps} />
    </div>
  )
}
