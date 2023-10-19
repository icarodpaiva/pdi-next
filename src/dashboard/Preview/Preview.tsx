"use client"

import { RenderComponents } from "../../helpers/RenderComponents"

import type { RenderComponentsProps } from "../../helpers/RenderComponents"

import style from "./Preview.module.css"

interface PreviewProps extends RenderComponentsProps {}

export const Preview = ({ pageComponents }: PreviewProps) => {
  return (
    <div className={style.previewContainer}>
      <div className={style.previewContent}>
        <h1 className={style.gridTitle}>Pré-visualização</h1>
        <hr />

        <div className={style.sectionsContainer}>
          <RenderComponents pageComponents={pageComponents} />
        </div>
      </div>
    </div>
  )
}
