import { pageSections } from "../../sections"

import type { PageSectionData } from "../../page"

import style from "./SectionsModal.module.css"

interface SectionsModalProps {
  pageSectionIndex: number
  addPageSection: (pageSectionData: PageSectionData, index: number) => void
  closeModal: () => void
}

export const SectionsModal = ({
  pageSectionIndex,
  addPageSection,
  closeModal
}: SectionsModalProps) => {
  const handleChooseSection = (pageSection: string) => {
    addPageSection({ pageSection, formData: {} }, pageSectionIndex)
    closeModal()
  }

  return (
    <div className={style.modalContainer}>
      <div className={style.modalContent}>
        <button onClick={closeModal}>X</button>

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
