import { TitleAndSubtitleForm, TitleAndSubtitle } from "./TitleAndSubtitle"
import { InfoCardForm, InfoCard } from "./InfoCard"

import type {
  TitleAndSubtitleFormProps,
  TitleAndSubtitleProps
} from "./TitleAndSubtitle"
import type { InfoCardFormProps, InfoCardProps } from "./InfoCard"

type Sections = { [key: string]: (props: any) => React.ReactNode }

export const sectionForms: Sections = {
  TitleAndSubtitle: (props: TitleAndSubtitleFormProps) => (
    <TitleAndSubtitleForm {...props} />
  ),
  InfoCard: (props: InfoCardFormProps) => <InfoCardForm {...props} />
}

export const pageSections = Object.keys(sectionForms)

export const sectionComponents: Sections = {
  TitleAndSubtitle: (props: TitleAndSubtitleProps) => (
    <TitleAndSubtitle {...props} />
  ),
  InfoCard: (props: InfoCardProps) => <InfoCard {...props} />
}
