import { withTheme } from "@rjsf/core"
import { Theme } from "@rjsf/mui"

const Form = withTheme(Theme)

import { customizeValidator } from "@rjsf/validator-ajv8"

import type { IChangeEvent } from "@rjsf/core"
import type { JSONSchemaType } from "ajv"
import type { Section } from "../../page"

interface DynamicFormProps<ComponentProps> {
  schema: JSONSchemaType<ComponentProps>
  index: number
  pageSectionData: Section
  setPageSectionsData: React.Dispatch<React.SetStateAction<Section[]>>
}

export const DynamicForm = <ComponentProps extends object>({
  schema,
  index,
  pageSectionData: { section, formData },
  setPageSectionsData
}: DynamicFormProps<ComponentProps>) => {
  type Schema = JSONSchemaType<ComponentProps>

  const validator = customizeValidator<any, Schema>()

  const handleChange = (
    data: IChangeEvent<any, JSONSchemaType<ComponentProps>, any>
  ) => {
    setPageSectionsData((prevPageSectionsData: Section[]) => {
      const updatedPageSectionsData = [...prevPageSectionsData]

      updatedPageSectionsData[index] = {
        section,
        formData: data.formData
      }

      return updatedPageSectionsData
    })
  }

  console.log(formData)

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
