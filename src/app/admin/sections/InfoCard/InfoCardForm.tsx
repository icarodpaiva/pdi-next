import { DynamicForm } from "../../components/DynamicForm"

import type { PageSectionData } from "../../page"
import type { FormField } from "../../components/DynamicForm"

interface InfoCardFormProps {
  index: number
  pageSection: string
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

export const InfoCardForm = (props: InfoCardFormProps) => {
  const formFields: FormField[] = [
    {
      name: "image",
      label: "Imagem",
      placeholder: "Imagem",
      type: "text",
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
