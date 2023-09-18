import { sectionForms } from "../../sections"
import { removeArrayItem } from "../../utils/removeArrayItem"

import type { PageSectionData } from "../../page"

import style from "./Section.module.css"

interface SectionProps {
  pageSectionData: PageSectionData
  index: number
  isUpButtonDisabled: boolean
  isDownButtonDisabled: boolean
  setPageSectionIndex: (pageSectionIndex: number) => void
  openModal: () => void
  addPageSection: (pageSectionData: PageSectionData, index: number) => void
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

export const Section = ({
  pageSectionData,
  index,
  isUpButtonDisabled,
  isDownButtonDisabled,
  setPageSectionIndex,
  openModal,
  addPageSection,
  setPageSectionsData
}: SectionProps) => {
  const handleOpenModal = (pageSectionIndex: number) => {
    setPageSectionIndex(pageSectionIndex)
    openModal()
  }

  const handleRemovePageSection = () => {
    setPageSectionsData(prevPageSectionsData =>
      removeArrayItem(prevPageSectionsData, index)
    )
  }

  const handleMovePageSection = (moveTo: "up" | "down") => {
    handleRemovePageSection()
    addPageSection(pageSectionData, moveTo === "up" ? index - 1 : index + 1)
  }

  const handleDuplicatePageSection = () => {
    addPageSection(pageSectionData, index + 1)
  }

  const PageSectionForm = sectionForms[pageSectionData.pageSection]

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

        {PageSectionForm && (
          <PageSectionForm
            index={index}
            pageSection={pageSectionData.pageSection}
            setPageSectionsData={setPageSectionsData}
          />
        )}
      </div>

      <button type="button" onClick={() => handleOpenModal(index + 1)}>
        +
      </button>
      <hr />
    </div>
  )
}
