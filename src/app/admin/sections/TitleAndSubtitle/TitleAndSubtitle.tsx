import type { JSONSchemaType } from "ajv"

interface TitleAndSubtitleProps {
  title: string
  subtitle: string
}

export const TitleAndSubtitle = ({
  title,
  subtitle
}: TitleAndSubtitleProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  )
}

export const TitleAndSubtitleSchema: JSONSchemaType<TitleAndSubtitleProps> = {
  type: "object",
  properties: {
    title: { type: "string" },
    subtitle: { type: "string" }
  },
  required: ["title", "subtitle"]
}
