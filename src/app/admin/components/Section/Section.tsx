import { sectionsComponents } from "../../helpers/sections"

import style from "./Section.module.css"

interface SectionProps {
  pageSection: string
  index: number
  isUpButtonDisabled: boolean
  isDownButtonDisabled: boolean
  setPageSectionIndex: (pageSectionIndex: number) => void
  openModal: () => void
  removePageSection: (index: number) => void
  addPageSection: (pageSection: string, index: number) => void
}

export const Section = ({
  pageSection,
  index,
  isUpButtonDisabled,
  isDownButtonDisabled,
  setPageSectionIndex,
  openModal,
  removePageSection,
  addPageSection
}: SectionProps) => {
  const handleOpenModal = (pageSectionIndex: number) => {
    setPageSectionIndex(pageSectionIndex)
    openModal()
  }

  const handleMovePageSection = (moveTo: "up" | "down") => {
    removePageSection(index)
    addPageSection(pageSection, moveTo === "up" ? index - 1 : index + 1)
  }

  const handleDuplicatePageSection = () => {
    addPageSection(pageSection, index + 1)
  }

  const handleRemovePageSection = () => {
    removePageSection(index)
  }

  return (
    <div>
      <hr />
      <button onClick={() => handleOpenModal(index)}>+</button>

      <div className={style.modalContainer}>
        <div className={style.buttonsContainer}>
          <button
            disabled={isUpButtonDisabled}
            onClick={() => handleMovePageSection("up")}
          >
            Mover para cima
          </button>

          <button
            disabled={isDownButtonDisabled}
            onClick={() => handleMovePageSection("down")}
          >
            Mover para baixo
          </button>

          <button onClick={handleDuplicatePageSection}>Duplicar</button>

          <button onClick={handleRemovePageSection}>Excluir</button>
        </div>

        {sectionsComponents[pageSection]()}
      </div>

      <button onClick={() => handleOpenModal(index + 1)}>+</button>
      <hr />
    </div>
  )
}
