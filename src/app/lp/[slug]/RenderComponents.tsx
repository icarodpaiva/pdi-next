"use client"

import { RenderSections } from "@/app/editor/[slug]/helpers/RenderSections"

import type { Section } from "@/app/editor/page"

interface RenderComponentsProps {
  sections: Section[]
}

export const RenderComponents = ({ sections }: RenderComponentsProps) => {
  return (
    <main>
      <RenderSections sections={sections} />
    </main>
  )
}
