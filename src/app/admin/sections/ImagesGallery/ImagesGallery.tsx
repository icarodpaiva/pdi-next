import type { JSONSchemaType } from "ajv"

interface ImagesGalleryProps {
  title: string
  images: Image[]
}

interface Image {
  src: string
  alt: string
}

export const ImagesGallery = ({ title, images = [] }: ImagesGalleryProps) => {
  return (
    <div>
      <h1>{title}</h1>

      {images.map(({ src, alt }) => (
        <img key={src} src={src} alt={alt} />
      ))}
    </div>
  )
}

export const schema: JSONSchemaType<ImagesGalleryProps> = {
  title: "Images Gallery",
  type: "object",
  properties: {
    title: { title: "Title", type: "string" },
    images: {
      title: "Images",
      type: "array",
      items: {
        type: "object",
        properties: {
          src: { title: "Image link", type: "string" },
          alt: { title: "Image description", type: "string" }
        },
        required: ["src", "alt"]
      }
    }
  },
  required: ["title", "images"]
}
