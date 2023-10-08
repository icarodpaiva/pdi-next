"use client"

import { useState, useRef } from "react"
import { AddCircle } from "@mui/icons-material"

import Link from "next/link"

import { Section } from "./components/Section"
import { Modal } from "./components/Modal"

import { useTemporaryPagesContext } from "../contexts/TemporaryPagesContext"
import { pageSections, sectionComponents } from "./helpers/sections"
import { addArrayItem } from "./utils/addArrayItem"

import style from "./page.module.css"

export interface PageSectionData {
  pageSection: string
  formData: { [key: string]: string }
}

export default function Admin() {
  const [isSectionsModalOpen, setIsSectionsModalOpen] = useState(false)
  const [isSavePageModalOpen, setIsSavePageModalOpen] = useState(false)

  const [slug, setSlug] = useState("")
  const [pageSectionIndex, setPageSectionIndex] = useState(0)
  const [pageSectionsData, setPageSectionsData] = useState<PageSectionData[]>(
    []
  )

  const savePageRef = useRef<HTMLInputElement | null>(null)

  const { setPages } = useTemporaryPagesContext()

  const handleOpenSectionsModal = (index: number) => {
    setIsSectionsModalOpen(true)
    setPageSectionIndex(index)
  }

  const handleCloseSectionsModal = () => {
    setIsSectionsModalOpen(false)
  }

  const addPageSection = (pageSectionData: PageSectionData, index: number) => {
    setPageSectionsData(prevPageSectionsData =>
      addArrayItem(prevPageSectionsData, index, pageSectionData)
    )
  }

  const handleChooseSection = (pageSection: string) => {
    addPageSection({ pageSection, formData: {} }, pageSectionIndex)
    handleCloseSectionsModal()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newSlug = encodeURIComponent(savePageRef.current?.value ?? "")

    setSlug(newSlug)

    setPages?.(prevPages => [...prevPages, { slug: newSlug, pageSectionsData }])

    setIsSavePageModalOpen(true)
  }

  const handleCloseSavePageModal = () => {
    setIsSavePageModalOpen(false)
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
              ref={savePageRef}
            />
          </div>

          {pageSectionsData.length <= 0 ? (
            <button
              type="button"
              onClick={() => handleOpenSectionsModal(0)}
              className={style.addSectionButton}
            >
              <AddCircle />
            </button>
          ) : (
            pageSectionsData.map((pageSectionData, index) => (
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
                  pageSectionData={pageSectionData}
                  index={index}
                  isUpButtonDisabled={index === 0}
                  isDownButtonDisabled={index === pageSectionsData.length - 1}
                  addPageSection={addPageSection}
                  setPageSectionsData={setPageSectionsData}
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

        {isSavePageModalOpen && (
          <Modal title="Página criada" onClose={handleCloseSavePageModal}>
            <p>
              Navegar para:{" "}
              <Link href={`/lp/${encodeURIComponent(slug)}`}>{slug}</Link>
            </p>
          </Modal>
        )}
      </div>

      <div className={style.previewContainer}>
        <div className={style.previewContent}>
          <h1 className={style.gridTitle}>Pré-visualização</h1>
          <hr className={style.divider} />

          <div className={style.sectionsContainer}>
            {pageSectionsData.map(({ pageSection, formData: props }, index) => {
              const PageSectionComponent = sectionComponents[pageSection]

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
