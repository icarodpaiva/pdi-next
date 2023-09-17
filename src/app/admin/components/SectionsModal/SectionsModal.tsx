import { sections } from "../../helpers/sections"

import style from "./SectionsModal.module.css"

interface SectionsModalProps {
  closeModal: () => void
  addPageSection: (pageSection: string) => void
}

export const SectionsModal = ({
  closeModal,
  addPageSection
}: SectionsModalProps) => {
  const handleChooseSection = (section: string) => {
    addPageSection(section)
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
