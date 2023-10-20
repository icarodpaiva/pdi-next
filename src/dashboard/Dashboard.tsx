"use client"

import { useState } from "react"

import { Editor } from "./Editor"
import { Preview } from "./Preview"

import type { PageData, Component } from "@/types/PagesRequests"

import style from "./Dashboard.module.css"

interface DashboardProps {
  initialData?: PageData
}

export const Dashboard = ({ initialData }: DashboardProps) => {
  const [sections, setSections] = useState<Component[]>(
    initialData?.sections ?? []
  )

  return (
    <div className={style.dashboardContainer}>
      <Editor
        sections={sections}
        setSections={setSections}
        editingPageSlug={initialData?.slug}
      />
      <Preview pageComponents={sections} />
    </div>
  )
}
