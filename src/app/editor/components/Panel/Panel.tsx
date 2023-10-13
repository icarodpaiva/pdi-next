"use client"

import { useState } from "react"

import { Editor } from "@/app/editor/components/Editor"
import { Preview } from "@/app/editor/components/Preview"

import type { PageData, ISection } from "@/app/types/PagesRequests"

import style from "./Panel.module.css"

interface PanelProps {
  initialData?: PageData
}

export const Panel = ({ initialData }: PanelProps) => {
  const [sections, setSections] = useState<ISection[]>(
    initialData?.sections ?? []
  )

  return (
    <div className={style.panelContainer}>
      <Editor
        sections={sections}
        setSections={setSections}
        editingPageSlug={initialData?.slug}
      />
      <Preview sections={sections} />
    </div>
  )
}
