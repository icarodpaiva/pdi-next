"use client"

import { useState } from "react"

import { Editor } from "./components/Editor"
import { Preview } from "./components/Preview"

import type { ISection } from "@/app/types/PagesRequests"

import style from "./page.module.css"

export default function CreatePage() {
  const [sections, setSections] = useState<ISection[]>([])

  return (
    <main className={style.main}>
      <Editor sections={sections} setSections={setSections} />
      <Preview sections={sections} />
    </main>
  )
}
