import { Dashboard } from "@/dashboard/Dashboard"

import type { PageData } from "@/types/PagesRequests"

interface EditPageProps {
  params: {
    slug: string
  }
}

export default async function EditPage({ params: { slug } }: EditPageProps) {
  // // To show Loading
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const response = await fetch(`http://localhost:3001/pages/${slug}`, {
    cache: "no-store"
  })

  if (response.status === 200) {
    const page: PageData = await response.json()

    return (
      <main>
        <Dashboard initialData={page} />
      </main>
    )
  }

  return (
    <main>
      <h1>Página não encontrada</h1>
    </main>
  )
}
