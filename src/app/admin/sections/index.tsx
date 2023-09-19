import { TitleAndSubtitleForm, TitleAndSubtitle } from "./TitleAndSubtitle"
import { InfoCardForm, InfoCard } from "./InfoCard"
import { InfoCardComplexForm, InfoCardComplex } from "./InfoCardComplex"

import type {
  TitleAndSubtitleFormProps,
  TitleAndSubtitleProps
} from "./TitleAndSubtitle"
import type { InfoCardFormProps, InfoCardProps } from "./InfoCard"
import type {
  InfoCardComplexFormProps,
  InfoCardComplexProps
} from "./InfoCardComplex"

type Sections = { [key: string]: (props: any) => React.ReactNode }

export const sectionForms: Sections = {
  TitleAndSubtitle: (props: TitleAndSubtitleFormProps) => (
    <TitleAndSubtitleForm {...props} />
  ),
  InfoCard: (props: InfoCardFormProps) => <InfoCardForm {...props} />,
  InfoCardComplex: (props: InfoCardComplexFormProps) => (
    <InfoCardComplexForm {...props} />
  )
}

export const pageSections = Object.keys(sectionForms)

export const sectionComponents: Sections = {
  TitleAndSubtitle: (props: TitleAndSubtitleProps) => (
    <TitleAndSubtitle {...props} />
  ),
  InfoCard: (props: InfoCardProps) => <InfoCard {...props} />,
  InfoCardComplex: (props: InfoCardComplexProps) => (
    <InfoCardComplex {...props} />
  )
}
