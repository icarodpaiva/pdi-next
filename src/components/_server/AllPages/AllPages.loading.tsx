import { arrayByNumber } from "@/utils/arrayByNumber"

export const AllPagesLoading = () => {
  const skeletons = arrayByNumber(10)

  return (
    <>
      <h1>Carregando páginas...</h1>

      <ul>
        {skeletons.map(skeleton => (
          <li key={skeleton}>...</li>
        ))}
      </ul>
    </>
  )
}
