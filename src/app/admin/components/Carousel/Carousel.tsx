import { DynamicForm } from "../DynamicForm"

import type { FormField } from "../DynamicForm"

export const Carousel = () => {
  const formFields: FormField[] = [
    {
      name: "firstName",
      label: "Primeiro Nome",
      type: "text",
      placeholder: "Digite seu primeiro nome"
    },
    {
      name: "lastName",
      label: "Sobrenome",
      type: "text",
      placeholder: "Digite seu sobrenome"
    },
    {
      name: "email",
      label: "E-mail",
      type: "email",
      placeholder: "Digite seu e-mail"
    },
    {
      name: "password",
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha"
    }
  ]

  return <DynamicForm formFields={formFields} />
}
