import { DynamicForm } from "../../components/DynamicForm"

import type { PageSectionData } from "../../page"
import type { FormField } from "../../components/DynamicForm"

interface CarouselFormProps {
  index: number
  pageSection: string
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

export const CarouselForm = (props: CarouselFormProps) => {
  const formFields: FormField[] = [
    {
      name: "firstName",
      label: "Primeiro Nome",
      type: "text",
      placeholder: "Digite seu primeiro nome",
      required: true
    },
    {
      name: "lastName",
      label: "Sobrenome",
      type: "text",
      placeholder: "Digite seu sobrenome",
      required: true
    }
  ]

  return <DynamicForm title="Carrossel" formFields={formFields} {...props} />
}
