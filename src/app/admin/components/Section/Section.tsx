import { sectionForms } from "../../helpers/sections"
import { removeArrayItem } from "../../utils/removeArrayItem"

import type { PageSectionData } from "../../page"

import style from "./Section.module.css"

interface SectionProps {
  pageSectionData: PageSectionData
  index: number
  isUpButtonDisabled: boolean
  isDownButtonDisabled: boolean
  addPageSection: (pageSectionData: PageSectionData, index: number) => void
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

export const Section = ({
  pageSectionData,
  index,
  isUpButtonDisabled,
  isDownButtonDisabled,
  addPageSection,
  setPageSectionsData
}: SectionProps) => {
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
    <div className={style.sectionContent}>
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

      <hr />

      {PageSectionForm && (
        <PageSectionForm
          index={index}
          pageSectionData={pageSectionData}
          setPageSectionsData={setPageSectionsData}
        />
      )}
    </div>
  )
}
