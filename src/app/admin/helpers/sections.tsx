import { DynamicForm } from "../components/DynamicForm"

import * as sections from "../sections"

type Sections = { [key: string]: (props: any) => React.ReactNode }

export const pageSections = Object.keys(sections)

export const sectionForms: Sections = {}

export const sectionComponents: Sections = {}

for (const [section, { schema }] of Object.entries(sections)) {
  sectionForms[section] = (props: any) => (
    <DynamicForm schema={schema} {...props} />
  )
}

for (const section of pageSections) {
  // @ts-ignore
  const Component = sections[section][section]
  sectionComponents[section] = (props: any) => <Component {...props} />
}
