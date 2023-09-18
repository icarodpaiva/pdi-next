import { DynamicForm } from "../../components/DynamicForm"

import type { PageSectionData } from "../../page"
import type { InfoCardProps } from "./"
import type { FormField } from "../../components/DynamicForm"

export interface InfoCardFormProps {
  index: number
  pageSection: string
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

type InfoCardPropsKeys = keyof InfoCardProps

export const InfoCardForm = (props: InfoCardFormProps) => {
  const formFields: FormField<InfoCardPropsKeys>[] = [
    {
      name: "image",
      label: "Imagem",
      placeholder: "Imagem",
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
