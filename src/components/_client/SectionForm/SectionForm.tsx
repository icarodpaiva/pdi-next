"use client"

import { forms } from "@/helpers/sectionsData"
import { removeArrayItem } from "@/utils/removeArrayItem"

import type { Component } from "@/types/PagesRequests"

import style from "./SectionForm.module.css"

interface SectionFormProps {
  section: Component
  index: number
  isUpButtonDisabled: boolean
  isDownButtonDisabled: boolean
  addPageSection: (section: Component, index: number) => void
  setSections: React.Dispatch<React.SetStateAction<Component[]>>
}

export const SectionForm = ({
  section,
  index,
  isUpButtonDisabled,
  isDownButtonDisabled,
  addPageSection,
  setSections
}: SectionFormProps) => {
  const handleRemovePageSection = () => {
    setSections(prevPageSectionsData =>
      removeArrayItem(prevPageSectionsData, index)
    )
  }

  const handleMovePageSection = (moveTo: "up" | "down") => {
    handleRemovePageSection()
    addPageSection(section, moveTo === "up" ? index - 1 : index + 1)
  }

  const handleDuplicatePageSection = () => {
    addPageSection(section, index + 1)
  }

  const Form = forms[section.section]

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

      {Form && (
        <Form index={index} section={section} setSections={setSections} />
      )}
    </div>
  )
}
