import Link from "next/link"

export default async function LandingPages() {
  // // To show Loading
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const response = await fetch("http://localhost:3001/pages/", {
    cache: "no-store"
  })

  if (response.status !== 200) {
    return (
      <main>
        <h1>Nenhuma página encontrada</h1>
        <Link href="/editor">Criar uma nova página</Link>
      </main>
    )
  }

  const pages: { slug: string }[] = await response.json()

  return (
    <main>
      <h1>Páginas</h1>

      <ul>
        {pages.map(({ slug }) => (
          <li key={slug}>
            <Link href={`/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
