import { sections } from "../sections"

import { Form } from "../components/_client/Form"

type Sections = { [key: string]: (props: any) => React.ReactNode }

const { forms, components } = sections.reduce(
  (acc, { Component, schema }) => {
    const { name } = Component

    acc.forms[name] = (props: any) => Form({ schema, ...props })

    acc.components[name] = (props: any) => Component({ ...props })

    return acc
  },
  { forms: {} as Sections, components: {} as Sections }
)

const sectionsNames = Object.keys(forms)

export { forms, components, sectionsNames }
