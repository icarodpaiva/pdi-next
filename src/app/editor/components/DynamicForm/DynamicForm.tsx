"use client"

import { withTheme } from "@rjsf/core"
import { Theme } from "@rjsf/mui"

const Form = withTheme(Theme)

import { customizeValidator } from "@rjsf/validator-ajv8"

import type { IChangeEvent } from "@rjsf/core"
import type { JSONSchemaType } from "ajv"
import type { ISection } from "@/app/types/PagesRequests"

interface DynamicFormProps<ComponentProps> {
  schema: JSONSchemaType<ComponentProps>
  index: number
  section: ISection
  setSections: React.Dispatch<React.SetStateAction<ISection[]>>
}

export const DynamicForm = <ComponentProps extends object>({
  schema,
  index,
  section: { section, formData },
  setSections
}: DynamicFormProps<ComponentProps>) => {
  type Schema = JSONSchemaType<ComponentProps>

  const validator = customizeValidator<any, Schema>()

  const handleChange = (
    data: IChangeEvent<any, JSONSchemaType<ComponentProps>, any>
  ) => {
    setSections((prevPageSectionsData: ISection[]) => {
      const updatedPageSectionsData = [...prevPageSectionsData]

      updatedPageSectionsData[index] = {
        section,
        formData: data.formData
      }

      return updatedPageSectionsData
    })
  }

  return (
    <Form
      _internalFormWrapper="div"
      schema={schema}
      validator={validator}
      formData={formData}
      onChange={handleChange}
    >
      <></>
    </Form>
  )
}
