import { Panel } from "../components/Panel"

import type { PageData } from "@/app/types/PagesRequests"

interface EditPageProps {
  params: {
    slug: string
  }
}

export default async function EditPage({ params: { slug } }: EditPageProps) {
  // To show Loading
  await new Promise(resolve => setTimeout(resolve, 3000))

  const response = await fetch(`http://localhost:3001/pages/${slug}`, {
    cache: "no-store"
  })

  if (response.status !== 200) {
    return (
      <main>
        <h1>Página não encontrada</h1>
      </main>
    )
  }

  const page: PageData = await response.json()

  return (
    <main>
      <Panel initialData={page} />
    </main>
  )
}
