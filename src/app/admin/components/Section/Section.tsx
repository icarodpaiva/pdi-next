import { sectionsComponents } from "../../helpers/sections"

import style from "./Section.module.css"

interface SectionProps {
  pageSection: string
  index: number
  setPageSectionIndex: (pageSectionIndex: number) => void
  removePageSection: (index: number) => void
  addPageSection: (pageSection: string, index: number) => void
  openModal: () => void
}

export const Section = ({
  index,
  pageSection,
  setPageSectionIndex,
  removePageSection,
  openModal
}: SectionProps) => {
  const handleOpenSections = (pageSectionIndex: number) => {
    setPageSectionIndex(pageSectionIndex)
    openModal()
  }

  return (
    <div>
      <hr />
      <button onClick={() => handleOpenSections(index)}>+</button>

      <div className={style.modalContainer}>
        <div className={style.buttonsContainer}>
          <button>Mover para baixo</button>
          <button>Mover para cima</button>
          <button>Duplicar</button>
          <button onClick={() => removePageSection(index)}>Excluir</button>
        </div>

        {sectionsComponents[pageSection]()}
      </div>

      <button onClick={() => handleOpenSections(index + 1)}>+</button>
      <hr />
    </div>
  )
}
