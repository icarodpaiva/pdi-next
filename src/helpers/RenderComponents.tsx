import { components } from "./sectionsData"

import type { Component } from "@/types/PagesRequests"

export interface RenderComponentsProps {
  pageComponents: Component[]
}

export const RenderComponents = ({ pageComponents }: RenderComponentsProps) => {
  return (
    <>
      {pageComponents.map(({ section, formData }, index) => {
        const PageComponent = components[section]

        if (PageComponent) {
          return <PageComponent key={index} {...formData} />
        }

        return null
      })}
    </>
  )
}
