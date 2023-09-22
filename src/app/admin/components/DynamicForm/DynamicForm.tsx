import Form from "@rjsf/core"

import { customizeValidator } from "@rjsf/validator-ajv8"

import type { IChangeEvent } from "@rjsf/core"
import type { JSONSchemaType } from "ajv"
import type { PageSectionData } from "../../page"

interface DynamicFormProps<ComponentProps> {
  schema: JSONSchemaType<ComponentProps>
  index: number
  pageSectionData: PageSectionData
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

export const DynamicForm = <ComponentProps extends object>({
  schema,
  index,
  pageSectionData: { pageSection, formData },
  setPageSectionsData
}: DynamicFormProps<ComponentProps>) => {
  type Schema = JSONSchemaType<ComponentProps>

  const validator = customizeValidator<any, Schema>()

  const handleChange = (
    data: IChangeEvent<any, JSONSchemaType<ComponentProps>, any>
  ) => {
    setPageSectionsData((prevPageSectionsData: PageSectionData[]) => {
      const updatedPageSectionsData = [...prevPageSectionsData]

      updatedPageSectionsData[index] = {
        pageSection,
        formData: data.formData
      }

      return updatedPageSectionsData
    })
  }

  return (
    <Form<any, Schema>
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
