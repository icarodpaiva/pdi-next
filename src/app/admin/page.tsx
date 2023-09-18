"use client"

import { useState } from "react"

import { Section } from "./components/Section"
import { SectionsModal } from "./components/SectionsModal"

import { sectionComponents } from "./sections"

import style from "./page.module.css"

export interface PageSectionData {
  pageSection: string
  formData: { [key: string]: unknown }
}

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [pageSectionIndex, setPageSectionIndex] = useState(0)
  const [pageSections, setPageSections] = useState<string[]>([])
  const [pageSectionsData, setPageSectionsData] = useState<PageSectionData[]>(
    []
  )

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const addPageSection = (pageSection: string, index: number) => {
    setPageSections(prevPageSections => {
      const updatedPageSections = [...prevPageSections]

      updatedPageSections.splice(index, 0, pageSection)

      return updatedPageSections
    })
  }

  const removePageSection = (index: number) => {
    setPageSections(prevPageSections => {
      const updatedPageSections = [...prevPageSections]

      updatedPageSections.splice(index, 1)

      return updatedPageSections
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={style.main}>
      <div>
        <h1>Criador de Página dinâmica</h1>

        {pageSections.length <= 0 ? (
          <button onClick={openModal}>+</button>
        ) : (
          <form onSubmit={handleSubmit}>
            {pageSections.map((pageSection, index) => (
              <Section
                key={index}
                pageSection={pageSection}
                index={index}
                isUpButtonDisabled={index === 0}
                isDownButtonDisabled={index === pageSections.length - 1}
                setPageSectionIndex={setPageSectionIndex}
                openModal={openModal}
                removePageSection={removePageSection}
                addPageSection={addPageSection}
                setPageSectionsData={setPageSectionsData}
              />
            ))}

            <button type="submit">Salvar Página</button>
          </form>
        )}

        {isModalOpen && (
          <SectionsModal
            pageSectionIndex={pageSectionIndex}
            addPageSection={addPageSection}
            closeModal={closeModal}
          />
        )}
      </div>

      <div className={style.previewContainer}>
        <h1>Pré visualização da Página dinâmica</h1>

        {pageSectionsData.map(({ pageSection, formData: props }, index) => {
          const PageSectionComponent = sectionComponents[pageSection]

          if (PageSectionComponent) {
            return <PageSectionComponent key={index} {...props} />
          }

          return null
        })}
      </div>
    </div>
  )
}
