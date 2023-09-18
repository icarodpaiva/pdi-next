import { CarouselForm, Carousel } from "./Carousel"
import { InfoCardForm, InfoCard } from "./InfoCard"

type Sections = { [key: string]: (props?: any) => React.ReactNode }

export const sectionForms: Sections = {
  Carousel: (props: any) => <CarouselForm {...props} />,
  InfoCard: (props: any) => <InfoCardForm {...props} />
}

export const sectionComponents: Sections = {
  Carousel: (props: any) => <Carousel {...props} />,
  InfoCard: (props: any) => <InfoCard {...props} />
}

export const sections = Object.keys(sectionForms)
