interface InfoCardComplexProps {
  image1: string
  name: string
  image2: string
  description: string
}

export const InfoCardComplex = ({
  image1,
  name,
  image2,
  description
}: InfoCardComplexProps) => {
  return (
    <div>
      <img alt="image" src={image1} />
      <h1>{name}</h1>
      <img alt="image" src={image2} />
      <p>{description}</p>
    </div>
  )
}
