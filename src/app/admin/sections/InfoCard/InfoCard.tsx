interface InfoCardProps {
  image: string
}

export const InfoCard = ({ image }: InfoCardProps) => {
  return (
    <div>
      <img alt="image" src={image} />
    </div>
  )
}
