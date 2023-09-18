export interface InfoCardProps {
  image: string
  name: string
  description: string
}

export const InfoCard = ({ image, name, description }: InfoCardProps) => {
  return (
    <div>
      <img alt="image" src={image} />

      <div>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
}
