import { DynamicForm, type FormField } from "../../components/DynamicForm"

export const InfoCard = () => {
  const formFields: FormField[] = [
    {
      name: "image",
      label: "Imagem",
      placeholder: "Imagem",
      type: "text",
      required: true
    }
  ]

  return <DynamicForm title="Cartão de Informações" formFields={formFields} />
}
