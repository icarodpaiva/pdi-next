import { RenderSections } from "../../helpers/RenderSections"

import type { RenderSectionsProps } from "../../helpers/RenderSections"

import style from "./Preview.module.css"

interface PreviewProps extends RenderSectionsProps {}

export const Preview = ({ sections }: PreviewProps) => {
  return (
    <div className={style.previewContainer}>
      <div className={style.previewContent}>
        <h1 className={style.gridTitle}>Pré-visualização</h1>
        <hr />

        <div className={style.sectionsContainer}>
          <RenderSections sections={sections} />
        </div>
      </div>
    </div>
  )
}
