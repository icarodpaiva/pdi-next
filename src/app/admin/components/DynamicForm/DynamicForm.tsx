import { useState } from "react"

import type { PageSectionData } from "../../page"

interface DynamicFormProps {
  title: string
  formFields: FormField[]
  index: number
  pageSection: string
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

export interface FormField {
  name: string
  label: string
  type: string
  placeholder: string
  required?: boolean
}

type FormData = { [key: string]: string }

export const DynamicForm = ({
  title,
  formFields,
  index,
  pageSection,
  setPageSectionsData
}: DynamicFormProps) => {
  const [formData, setFormData] = useState<FormData>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))

    setPageSectionsData((prevPageSectionsData: PageSectionData[]) => {
      const updatedPageSectionsData = [...prevPageSectionsData]

      updatedPageSectionsData[index] = {
        pageSection,
        formData: {
          ...formData,
          [name]: value
        }
      }

      return updatedPageSectionsData
    })
  }

  return (
    <div>
      <h2>{title}</h2>

      {formFields.map(({ name, label, type, placeholder, required }) => (
        <div key={name}>
          <label htmlFor={name}>{label}</label>

          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={formData[name] || ""}
            onChange={handleChange}
            autoComplete="off"
            required={required}
          />
        </div>
      ))}
    </div>
  )
}

export default DynamicForm
