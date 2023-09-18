import { CarouselForm, Carousel } from "./Carousel"
import { InfoCardForm, InfoCard } from "./InfoCard"

import type { CarouselFormProps, CarouselProps } from "./Carousel"
import type { InfoCardFormProps, InfoCardProps } from "./InfoCard"

type Sections = { [key: string]: (props: any) => React.ReactNode }

export const sectionForms: Sections = {
  Carousel: (props: CarouselFormProps) => <CarouselForm {...props} />,
  InfoCard: (props: InfoCardFormProps) => <InfoCardForm {...props} />
}

export const pageSections = Object.keys(sectionForms)

export const sectionComponents: Sections = {
  Carousel: (props: CarouselProps) => <Carousel {...props} />,
  InfoCard: (props: InfoCardProps) => <InfoCard {...props} />
}
