import type { JSONSchemaType } from "ajv"

import style from "./ImageGallery.module.css"

interface ImagesGalleryProps {
  title: string
  images: Image[]
}

interface Image {
  src: string
  alt: string
}

export const ImagesGallery = ({
  title,
  images
}: DeepPartial<ImagesGalleryProps>) => {
  return (
    <div className={style.imagesGalleryContainer}>
      <h1>{title}</h1>

      <div className={style.imagesGallery}>
        {images?.map(image => (
          <img key={image?.src} src={image?.src} alt={image?.alt} />
        ))}
      </div>
    </div>
  )
}

export const schema: JSONSchemaType<ImagesGalleryProps> = {
  title: "Images Gallery",
  type: "object",
  properties: {
    title: {
      title: "Title",
      type: "string"
    },
    images: {
      title: "Images",
      type: "array",
      items: {
        type: "object",
        properties: {
          src: {
            title: "Image link",
            type: "string",
            default: "https://placehold.jp/f00/fff/300x300.png"
          },
          alt: {
            title: "Image description",
            type: "string",
            default: "placeholder img"
          }
        },
        required: ["src", "alt"]
      }
    }
  },
  required: ["title", "images"]
}
