import Link from "next/link"

// import style from "./Pages.module.css"

export const Pages = async () => {
  // // To show Loading
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const response = await fetch("http://localhost:3001/pages/", {
    cache: "no-store"
  })

  if (response.status !== 200) {
    return <h1>Nenhuma página encontrada</h1>
  }

  const pages: { slug: string }[] = await response.json()

  return (
    <>
      <h1>Páginas</h1>

      <ul>
        {pages.map(({ slug }) => (
          <li key={slug}>
            <Link href={`/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
