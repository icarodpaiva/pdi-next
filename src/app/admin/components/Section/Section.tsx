import { sectionForms } from "../../sections"

import type { PageSectionData } from "../../page"

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
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

export const Section = ({
  pageSection,
  index,
  isUpButtonDisabled,
  isDownButtonDisabled,
  setPageSectionIndex,
  openModal,
  removePageSection,
  addPageSection,
  setPageSectionsData
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

  const PageSectionForm = sectionForms[pageSection]

  return (
    <div className={style.sectionContainer}>
      <hr />
      <button type="button" onClick={() => handleOpenModal(index)}>
        +
      </button>

      <div>
        <div className={style.buttonsContainer}>
          <button
            type="button"
            disabled={isUpButtonDisabled}
            onClick={() => handleMovePageSection("up")}
          >
            Mover para cima
          </button>

          <button
            type="button"
            disabled={isDownButtonDisabled}
            onClick={() => handleMovePageSection("down")}
          >
            Mover para baixo
          </button>

          <button type="button" onClick={handleDuplicatePageSection}>
            Duplicar
          </button>

          <button type="button" onClick={handleRemovePageSection}>
            Excluir
          </button>
        </div>

        <PageSectionForm
          index={index}
          pageSection={pageSection}
          setPageSectionsData={setPageSectionsData}
        />
      </div>

      <button type="button" onClick={() => handleOpenModal(index + 1)}>
        +
      </button>
      <hr />
    </div>
  )
}
