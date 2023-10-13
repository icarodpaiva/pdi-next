import { AddSectionButton } from "../AddSectionButton/AddSectionButton"
import { SectionForm } from "../SectionForm"

import type { ISection } from "@/app/types/PagesRequests"

import style from "./Section.module.css"

interface SectionProps {
  handleOpenSectionsModal: (sectionIndex: number) => void
  index: number
  section: ISection
  sectionsLength: number
  addPageSection: (section: ISection, sectionIndex: number) => void
  setSections: React.Dispatch<React.SetStateAction<ISection[]>>
}

export const Section = ({
  handleOpenSectionsModal,
  index,
  section,
  sectionsLength,
  addPageSection,
  setSections
}: SectionProps) => {
  return (
    <div className={style.sectionContainer}>
      {index === 0 && (
        <AddSectionButton
          handleOpenSectionsModal={handleOpenSectionsModal}
          sectionIndex={index}
        />
      )}

      <SectionForm
        index={index}
        section={section}
        isUpButtonDisabled={index === 0}
        isDownButtonDisabled={index === sectionsLength - 1}
        addPageSection={addPageSection}
        setSections={setSections}
      />

      <AddSectionButton
        handleOpenSectionsModal={handleOpenSectionsModal}
        sectionIndex={index + 1}
      />
    </div>
  )
}
