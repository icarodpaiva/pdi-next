"use client"

import { useState } from "react"

import { Section } from "./components/Section"
import { SectionsModal } from "./components/SectionsModal"

import { sectionComponents } from "./sections"
import { addArrayItem } from "./utils/addArrayItem"

import style from "./page.module.css"

export interface PageSectionData {
  pageSection: string
  formData: { [key: string]: unknown }
}

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [pageSectionIndex, setPageSectionIndex] = useState(0)
  const [pageSectionsData, setPageSectionsData] = useState<PageSectionData[]>(
    []
  )

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const addPageSection = (pageSectionData: PageSectionData, index: number) => {
    setPageSectionsData(prevPageSectionsData =>
      addArrayItem(prevPageSectionsData, index, pageSectionData)
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={style.main}>
      <div>
        <h1>Criador de Página dinâmica</h1>

        {pageSectionsData.length <= 0 ? (
          <button onClick={openModal} style={{ padding: 16 }}>
            +
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            {pageSectionsData.map((pageSectionData, index) => (
              <Section
                key={index}
                pageSectionData={pageSectionData}
                index={index}
                isUpButtonDisabled={index === 0}
                isDownButtonDisabled={index === pageSectionsData.length - 1}
                setPageSectionIndex={setPageSectionIndex}
                openModal={openModal}
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
