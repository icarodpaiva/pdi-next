import { useState } from "react"

interface DynamicFormProps {
  formFields: FormField[]
}

export interface FormField {
  name: string
  label: string
  type: string
  placeholder: string
}

type FormData = { [key: string]: string }

export const DynamicForm = ({ formFields }: DynamicFormProps) => {
  const [formData, setFormData] = useState<FormData>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  return (
    <div>
      <form>
        {formFields.map(({ name, label, type, placeholder }) => (
          <div key={name}>
            <label htmlFor={`input-${name}`}>{label}</label>
            <input
              id={name}
              name={`input-${name}`}
              type={type}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        ))}
      </form>
    </div>
  )
}

export default DynamicForm
