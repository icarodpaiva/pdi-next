import { Carousel } from "./Carousel"
import { InfoCard } from "./InfoCard"

type SectionsForms = { [key: string]: () => JSX.Element }

export const sectionForms: SectionsForms = {
  Carousel,
  InfoCard
}

export const sections = Object.keys(sectionForms)
