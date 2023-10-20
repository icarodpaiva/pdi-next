import { ImagesGallery, ImagesGallerySchema } from "./ImagesGallery"
import { InfoCard, InfoCardSchema } from "./InfoCard"

import type { JSONSchemaType } from "ajv"

type Section = {
  Component: (props: any) => React.ReactNode
  schema: JSONSchemaType<any>
}

export const sections: Section[] = [
  { Component: ImagesGallery, schema: ImagesGallerySchema },
  { Component: InfoCard, schema: InfoCardSchema }
]
