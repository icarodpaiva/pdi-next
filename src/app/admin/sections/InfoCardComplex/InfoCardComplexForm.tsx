import { DynamicForm } from "../../components/DynamicForm"

import type { PageSectionData } from "../../page"
import type { InfoCardComplexProps } from "./"
import type { FormField } from "../../components/DynamicForm"

export interface InfoCardComplexFormProps {
  index: number
  pageSectionData: PageSectionData
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

type InfoCardComplexPropsKeys = keyof InfoCardComplexProps

export const InfoCardComplexForm = (props: InfoCardComplexFormProps) => {
  const formFields: FormField<InfoCardComplexPropsKeys>[] = [
    {
      name: "image1",
      label: "Imagem 1",
      placeholder: "Imagem 1",
      type: "text",
      required: true
    },
    {
      name: "name",
      label: "Nome",
      type: "text",
      placeholder: "Nome",
      required: true
    },
    {
      name: "image2",
      label: "Imagem 2",
      placeholder: "Imagem 2",
      type: "text",
      required: true
    },
    {
      name: "description",
      label: "Descrição",
      type: "text",
      placeholder: "Descrição",
      required: true
    }
  ]

  return (
    <DynamicForm
      title="Cartão de Informações"
      formFields={formFields}
      {...props}
    />
  )
}
