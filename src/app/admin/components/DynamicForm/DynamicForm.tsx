"use client"

import { useState } from "react"

import type { PageSectionData } from "../../page"

interface DynamicFormProps<PropsKeys = string> {
  title: string
  formFields: FormField<PropsKeys>[]
  index: number
  pageSectionData: PageSectionData
  setPageSectionsData: React.Dispatch<React.SetStateAction<PageSectionData[]>>
}

export interface FormField<PropsKeys> {
  name: PropsKeys
  label: string
  type: string
  placeholder: string
  required?: boolean
}

export const DynamicForm = ({
  title,
  formFields,
  index,
  pageSectionData: { pageSection, formData },
  setPageSectionsData
}: DynamicFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

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
