"use client"

import { useState } from "react"

import { Editor } from "./Editor"
import { Preview } from "./Preview"

import type { PageData, Component } from "../types/PagesRequests"

import style from "./Dashboard.module.css"

interface PanelProps {
  initialData?: PageData
}

export const Dashboard = ({ initialData }: PanelProps) => {
  const [sections, setSections] = useState<Component[]>(
    initialData?.sections ?? []
  )

  return (
    <div className={style.panelContainer}>
      <Editor
        sections={sections}
        setSections={setSections}
        editingPageSlug={initialData?.slug}
      />
      <Preview pageComponents={sections} />
    </div>
  )
}
