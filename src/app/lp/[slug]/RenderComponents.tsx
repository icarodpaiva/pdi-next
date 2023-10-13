"use client"

import { sectionComponents } from "@/app/admin/helpers/sections"

import type { Section } from "@/app/admin/page"

interface RenderComponentsProps {
  sections: Section[]
}

export const RenderComponents = ({ sections }: RenderComponentsProps) => {
  return (
    <main>
      {sections.map(({ section, formData: props }, index) => {
        const PageSectionComponent = sectionComponents[section]
        if (PageSectionComponent) {
          return <PageSectionComponent key={index} {...props} />
        }
        return null
      })}
    </main>
  )
}
