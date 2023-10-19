"use client"

import { AddCircle } from "@mui/icons-material"

import style from "./AddSection.module.css"

interface AddSectionProps {
  index: number
  handleOpenSectionsModal: (index: number) => void
}

export const AddSection = ({
  index,
  handleOpenSectionsModal
}: AddSectionProps) => {
  const handleOpenModal = () => {
    handleOpenSectionsModal(index)
  }

  return (
    <button
      type="button"
      onClick={handleOpenModal}
      className={style.addSectionButton}
    >
      <AddCircle />
    </button>
  )
}
