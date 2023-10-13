import { RenderSections } from "@/app/helpers/RenderSections"

import type { PageData } from "@/app/types/PagesRequests"

interface LandingPageProps {
  params: {
    slug: string
  }
}

export default async function LandingPage({
  params: { slug }
}: LandingPageProps) {
  // // To show Loading
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const response = await fetch(`http://localhost:3001/pages/${slug}`)

  if (response.status !== 200) {
    return (
      <main>
        <h1>Página não encontrada</h1>
      </main>
    )
  }

  const { sections }: PageData = await response.json()

  return (
    <main>
      <RenderSections sections={sections} />
    </main>
  )
}
