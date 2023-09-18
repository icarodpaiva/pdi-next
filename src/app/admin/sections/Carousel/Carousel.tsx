interface CarouselProps {
  firstName: string
  lastName: string
}

export const Carousel = ({ firstName, lastName }: CarouselProps) => {
  return (
    <div>
      <h1>Carousel content</h1>
      <p>{firstName}</p>
      <p>{lastName}</p>
    </div>
  )
}
