import type { JSONSchemaType } from "ajv"

interface InfoCardProps {
  image: Image
  title: string
  description: string
}

interface Image {
  src: string
  alt: string
}

export const InfoCard = ({
  image: { src, alt },
  title,
  description
}: InfoCardProps) => {
  return (
    <div>
      <img src={src} alt={alt} />

      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
}

export const schema: JSONSchemaType<InfoCardProps> = {
  title: "Info Card",
  type: "object",
  properties: {
    image: {
      title: "Image",
      type: "object",
      properties: {
        src: { title: "Image link", type: "string" },
        alt: { title: "Image description", type: "string" }
      },
      required: ["src", "alt"]
    },
    title: { title: "Title", type: "string" },
    description: { title: "Description", type: "string" }
  },
  required: ["image", "title", "description"]
}
