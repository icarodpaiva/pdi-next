"use client"

import { useState } from "react"

import { Section } from "./components/Section"
import { SectionsModal } from "./components/SectionsModal"

import style from "./page.module.css"

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [pageSections, setPageSections] = useState<string[]>([])
  const [pageSectionIndex, setPageSectionIndex] = useState(0)

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

  return (
    <div className={style.main}>
      <h1>Páginas dinâmicas</h1>

      {pageSections.length <= 0 ? (
        <button onClick={openModal}>+</button>
      ) : (
        pageSections.map((pageSection, index) => (
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
          />
        ))
      )}

      {isModalOpen && (
        <SectionsModal
          pageSectionIndex={pageSectionIndex}
          addPageSection={addPageSection}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}
