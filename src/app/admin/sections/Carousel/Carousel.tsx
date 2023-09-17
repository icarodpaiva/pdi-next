import { DynamicForm, type FormField } from "../../components/DynamicForm"

export const Carousel = () => {
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

  return <DynamicForm title="Carrossel" formFields={formFields} />
}
