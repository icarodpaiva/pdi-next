import Form from '@rjsf/core'

import { customizeValidator } from '@rjsf/validator-ajv8'

import type { JSONSchemaType } from 'ajv'

interface DynamicFormV2Props<ComponentProps> {
  schema: JSONSchemaType<ComponentProps>
}

export const DynamicFormV2 = <ComponentProps extends object>({
  schema
}: DynamicFormV2Props<ComponentProps>) => {
  type Schema = JSONSchemaType<ComponentProps>

  const validator = customizeValidator<any, Schema>()

  return <Form<any, Schema> schema={schema} validator={validator} />
}
