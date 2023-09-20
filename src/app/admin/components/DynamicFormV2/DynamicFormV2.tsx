import Form from "@rjsf/core"

import { customizeValidator } from "@rjsf/validator-ajv8"

import type { JSONSchemaType } from "ajv"

interface DynamicFormV2Props<ComponentProps> {
  schema: JSONSchemaType<ComponentProps>
}

export const DynamicFormV2 = <ComponentProps extends object>({
  schema
}: DynamicFormV2Props<ComponentProps>) => {
  type Schema = JSONSchemaType<ComponentProps>

  const validator = customizeValidator<any, Schema>()

  return (
    <Form<any, Schema>
      _internalFormWrapper="div"
      schema={schema}
      validator={validator}
      onChange={e => console.log(e)}
      onBlur={e => console.log(e)}
      onFocus={e => console.log(e)}
      onError={e => console.log(e)}
      onSubmit={e => console.log(e)}
    >
      <></>
    </Form>
  )
}
