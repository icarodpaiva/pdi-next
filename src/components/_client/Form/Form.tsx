"use client"

import { withTheme } from "@rjsf/core"
import { Theme } from "@rjsf/mui"

import { customizeValidator } from "@rjsf/validator-ajv8"

import type { IChangeEvent } from "@rjsf/core"
import type { JSONSchemaType } from "ajv"
import type { Component } from "../../../types/PagesRequests"

interface FormProps<ComponentProps> {
  schema: JSONSchemaType<ComponentProps>
  index: number
  section: Component
  setSections: React.Dispatch<React.SetStateAction<Component[]>>
}

const DynamicForm = withTheme(Theme)

export const Form = <ComponentProps extends object>({
  schema,
  index,
  section: { section, formData },
  setSections
}: FormProps<ComponentProps>) => {
  type Schema = JSONSchemaType<ComponentProps>

  const validator = customizeValidator<any, Schema>()

  const handleChange = ({
    formData
  }: IChangeEvent<any, JSONSchemaType<ComponentProps>, any>) => {
    setSections((prevSections: Component[]) => {
      const updatedSections = [...prevSections]

      updatedSections[index] = {
        section,
        formData
      }

      return updatedSections
    })
  }

  return (
    <DynamicForm
      _internalFormWrapper="div"
      schema={schema}
      validator={validator}
      formData={formData}
      onChange={handleChange}
    >
      <></>
    </DynamicForm>
  )
}
