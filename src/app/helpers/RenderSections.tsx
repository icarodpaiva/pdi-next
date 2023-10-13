import { sectionComponents } from "./sections"

import { ISection } from "@/app/types/PagesRequests"

export interface RenderSectionsProps {
  sections: ISection[]
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
