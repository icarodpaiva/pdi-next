import { RenderComponents } from "@/helpers/RenderComponents"

import type { PageData } from "@/types/PagesRequests"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Page({ params: { slug } }: PageProps) {
  try {
    // // To show Loading
    // await new Promise(resolve => setTimeout(resolve, 3000))

    const response = await fetch(`http://localhost:3001/pages/${slug}`, {
      cache: "no-store"
    })

    if (response.status === 200) {
      const { sections }: PageData = await response.json()

      return (
        <main>
          <RenderComponents pageComponents={sections} />
        </main>
      )
    }

    return (
      <main>
        <h1>Página não encontrada</h1>
      </main>
    )
  } catch {
    return <h1>Erro ao carregar página</h1>
  }
}
