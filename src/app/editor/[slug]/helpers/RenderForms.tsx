import { sectionComponents } from "./sections"

import { Section as SectionType } from "../types/Section"

import style from "./RenderForms.module.css"
import { Section } from "../components/SectionForm"
import { AddSectionButton } from "../components/AddSectionButton/AddSectionButton"

export interface RenderFormsProps {
  sections: SectionType[]
  handleOpenSectionsModal: (sectionIndex: number) => void
}

export const RenderForms = ({
  sections,
  handleOpenSectionsModal
}: RenderFormsProps) => {
  return (
    <>
      {sections.map((section, index) => (
        <div key={index} className={style.sectionContainer}>
          {index === 0 && (
            <AddSectionButton
              handleOpenSectionsModal={handleOpenSectionsModal}
              sectionIndex={0}
            />
          )}

          <Section
            pageSectionData={section}
            index={index}
            isUpButtonDisabled={index === 0}
            isDownButtonDisabled={index === sections.length - 1}
            addPageSection={addPageSection}
            setPageSectionsData={setSections}
          />

          <AddSectionButton
            handleOpenSectionsModal={handleOpenSectionsModal}
            sectionIndex={index + 1}
          />
        </div>
      ))}
    </>
  )
}
