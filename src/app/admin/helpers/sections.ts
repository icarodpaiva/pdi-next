import { Carousel } from "../components/Carousel"
import { Shelf } from "../components/Shelf"

type SectionsComponents = { [key: string]: () => JSX.Element }

export const sectionsComponents: SectionsComponents = {
  Carousel,
  Shelf
}

export const sections = Object.keys(sectionsComponents)
