export const PagesSkeleton = () => {
  const skeletons = Array.from({ length: 10 }).map((_, index) => (
    <li key={index}>...</li>
  ))

  return (
    <>
      <h1>Carregando páginas...</h1>

      <ul>{skeletons}</ul>
    </>
  )
}
