import { AddSection } from "../AddSection"
import { SectionForm } from "../SectionForm"

import type { Component } from "@/types/PagesRequests"

import style from "./Section.module.css"

interface SectionProps {
  index: number
  section: Component
  sectionsLength: number
  handleOpenSectionsModal: (index: number) => void
  addSection: (section: Component, index: number) => void
  setSections: React.Dispatch<React.SetStateAction<Component[]>>
}

export const Section = ({
  index,
  section,
  sectionsLength,
  handleOpenSectionsModal,
  addSection,
  setSections
}: SectionProps) => {
  return (
    <div className={style.sectionContainer}>
      {index === 0 && (
        <AddSection
          index={index}
          handleOpenSectionsModal={handleOpenSectionsModal}
        />
      )}

      <SectionForm
        index={index}
        section={section}
        isUpButtonDisabled={index === 0}
        isDownButtonDisabled={index === sectionsLength - 1}
        addSection={addSection}
        setSections={setSections}
      />

      <AddSection
        index={index + 1}
        handleOpenSectionsModal={handleOpenSectionsModal}
      />
    </div>
  )
}
