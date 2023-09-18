import { DynamicForm } from "../../components/DynamicForm"

import type { PageSectionData } from "../../page"
import type { TitleAndSubtitleProps } from "./"
import type { FormField } from "../../components/DynamicForm"

export interface TitleAndSubtitleFormProps {
  index: number
  pageSectionData: PageSectionData
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

type TitleAndSubtitlePropsKeys = keyof TitleAndSubtitleProps

export const TitleAndSubtitleForm = (props: TitleAndSubtitleFormProps) => {
  const formFields: FormField<TitleAndSubtitlePropsKeys>[] = [
    {
      name: "title",
      label: "Título",
      type: "text",
      placeholder: "Título",
      required: true
    },
    {
      name: "subtitle",
      label: "Subtítulo",
      type: "text",
      placeholder: "Subtítulo",
      required: true
    }
  ]

  return (
    <DynamicForm
      title="Título e Subtítulo"
      formFields={formFields}
      {...props}
    />
  )
}
