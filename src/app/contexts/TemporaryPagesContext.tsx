"use client"

import React, { createContext, useContext, useState } from "react"

import type { PageSectionData } from "../admin/page"

interface PageData {
  slug: string
  pageSectionsData: PageSectionData[]
}

export interface TemporaryPagesContextProps {
  pages?: PageData[]
  setPages?: React.Dispatch<React.SetStateAction<PageData[]>>
}

const TemporaryPagesContext = createContext<TemporaryPagesContextProps | null>(
  null
)

export const TemporaryPagesContextProvider = ({
  children
}: React.PropsWithChildren<TemporaryPagesContextProps>) => {
  const [pages, setPages] = useState<PageData[]>([])

  return (
    <TemporaryPagesContext.Provider value={{ pages, setPages }}>
      {children}
    </TemporaryPagesContext.Provider>
  )
}

export const useTemporaryPagesContext = () => {
  const context = useContext(TemporaryPagesContext)

  if (!context) {
    throw new Error(
      "useTemporaryPagesContext must be used within a TemporaryPagesContextProvider"
    )
  }

  return context
}
