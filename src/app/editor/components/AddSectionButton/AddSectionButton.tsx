"use client"

import { AddCircle } from "@mui/icons-material"

import style from "./AddSectionButton.module.css"

interface AddSectionButtonProps {
  handleOpenSectionsModal: (sectionIndex: number) => void
  sectionIndex: number
}

export const AddSectionButton = ({
  handleOpenSectionsModal,
  sectionIndex
}: AddSectionButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => handleOpenSectionsModal(sectionIndex)}
      className={style.addSectionButton}
    >
      <AddCircle />
    </button>
  )
}
