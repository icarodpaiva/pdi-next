export interface InfoCardProps {
  image: string
  name: string
  description: string
}

export const InfoCard = ({ image, name, description }: InfoCardProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid black"
      }}
    >
      <img alt="image" src={image} style={{ marginRight: 10 }} />

      <div>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
}
