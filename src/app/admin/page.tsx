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

  const addPageSection = (pageSection: string) => {
    setPageSections(prevPageSections => {
      const updatedPageSections = [...prevPageSections]

      updatedPageSections.splice(pageSectionIndex, 0, pageSection)

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
      <h1>Admin</h1>

      {pageSections.length <= 0 ? (
        <button onClick={openModal}>+</button>
      ) : (
        pageSections.map((pageSection, index) => (
          <Section
            index={index}
            pageSection={pageSection}
            addPageSection={addPageSection}
            removePageSection={removePageSection}
            openModal={openModal}
            setPageSectionIndex={setPageSectionIndex}
          />
        ))
      )}

      {isModalOpen && (
        <SectionsModal
          closeModal={closeModal}
          addPageSection={addPageSection}
        />
      )}
    </div>
  )
}
