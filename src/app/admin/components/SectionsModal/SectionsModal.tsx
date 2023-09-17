import { sections } from "../../sections"

import style from "./SectionsModal.module.css"

interface SectionsModalProps {
  pageSectionIndex: number
  addPageSection: (pageSection: string, index: number) => void
  closeModal: () => void
}

export const SectionsModal = ({
  pageSectionIndex,
  addPageSection,
  closeModal
}: SectionsModalProps) => {
  const handleChooseSection = (section: string) => {
    addPageSection(section, pageSectionIndex)
    closeModal()
  }

  return (
    <div className={style.modalContainer}>
      <div className={style.modalContent}>
        <button onClick={closeModal}>X</button>

        <ul>
          {sections.map(section => (
            <li key={section}>
              <button onClick={() => handleChooseSection(section)}>
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
