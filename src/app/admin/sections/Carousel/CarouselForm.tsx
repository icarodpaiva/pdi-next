import { DynamicForm } from "../../components/DynamicForm"

import type { PageSectionData } from "../../page"
import type { CarouselProps } from "./"
import type { FormField } from "../../components/DynamicForm"

interface CarouselFormProps {
  index: number
  pageSection: string
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

type CarouselPropsKeys = keyof CarouselProps

export const CarouselForm = (props: CarouselFormProps) => {
  const formFields: FormField<CarouselPropsKeys>[] = [
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
