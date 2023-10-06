import { pageSections } from "../../helpers/sections"

import type { PageSectionData } from "../../page"

import style from "./SectionsModal.module.css"

interface SectionsModalProps {
  pageSectionIndex: number
  addPageSection: (pageSectionData: PageSectionData, index: number) => void
  handleCloseModal: () => void
}

export const SectionsModal = ({
  pageSectionIndex,
  addPageSection,
  handleCloseModal
}: SectionsModalProps) => {
  const handleChooseSection = (pageSection: string) => {
    addPageSection({ pageSection, formData: {} }, pageSectionIndex)
    handleCloseModal()
  }

  return (
    <div className={style.modalContainer}>
      <div className={style.modalContent}>
        <div className={style.titleContainer}>
          <h2>Seções</h2>
          <button onClick={handleCloseModal}>X</button>
        </div>

        <ul>
          {pageSections.map(pageSection => (
            <li key={pageSection}>
              <button onClick={() => handleChooseSection(pageSection)}>
                {pageSection}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
