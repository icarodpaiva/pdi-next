import { DynamicForm } from "../components/DynamicForm"
import { components, schemas } from "../sections"

type Sections = { [key: string]: (props: any) => React.ReactNode }

export const pageSections = Object.keys(components)

export const sectionForms: Sections = {}

for (const componentName in components) {
  const schemaKey = `${componentName}Schema` as keyof typeof schemas

  if (schemas.hasOwnProperty(schemaKey)) {
    const schema = schemas[schemaKey]
    sectionForms[componentName] = (props: any) => (
      <DynamicForm schema={schema} {...props} />
    )
  }
}

export const sectionComponents: Sections = {}

for (const componentName in components) {
  const Component = components[componentName as keyof typeof components]
  sectionComponents[componentName] = (props: any) => <Component {...props} />
}
