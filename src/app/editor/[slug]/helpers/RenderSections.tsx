import { sectionComponents } from "./sections"

import { Section } from "../types/Section"

export interface RenderSectionsProps {
  sections: Section[]
}

export const RenderSections = ({ sections }: RenderSectionsProps) => {
  return (
    <>
      {sections.map(({ section, formData: props }, index) => {
        const PageSectionComponent = sectionComponents[section]

        if (PageSectionComponent) {
          return <PageSectionComponent key={index} {...props} />
        }

        return null
      })}
    </>
  )
}
