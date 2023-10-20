import { JSONSchemaType } from "ajv"
import style from "./InfoCard.module.css"

interface InfoCardProps {
  src: string
  alt: string
  title?: string
  text?: string
}

export const InfoCard = ({
  src,
  alt,
  title,
  text
}: DeepPartial<InfoCardProps>) => {
  const hasTextBlock = title || text

  return (
    <div className={style.infoCardContainer}>
      <img src={src} alt={alt} />

      {hasTextBlock && (
        <div className={style.textBlockContainer}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      )}
    </div>
  )
}

export const InfoCardSchema: JSONSchemaType<InfoCardProps> = {
  title: "InfoCard",
  type: "object",
  properties: {
    src: {
      title: "Image link",
      type: "string",
      default: "https://placehold.jp/0f0/fff/400x500.png"
    },
    alt: {
      title: "Image description",
      type: "string",
      default: "placeholder img"
    },
    title: {
      title: "Title",
      type: "string",
      default: "Test Title",
      nullable: true
    },
    text: {
      title: "Text",
      type: "string",
      default:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum quam accusamus ad officiis hic soluta autem tenetur nisi fugiat eveniet earum, dolore, maiores sed nostrum at laborum, nulla laboriosam quas.",
      nullable: true
    }
  },
  required: ["src", "alt"]
}
