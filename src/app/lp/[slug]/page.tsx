import { RenderSections } from "@/app/helpers/RenderSections"

import type { PageData, RequestError } from "@/app/types/PagesRequests"

interface LandingPageProps {
  params: {
    slug: string
  }
}

export default async function LandingPage({
  params: { slug }
}: LandingPageProps) {
  console.log("slug", slug)

  const response = await fetch(`http://localhost:3001/pages/${slug}`)
  const page = await response.json()

  if (response.status !== 200) {
    return <div>{(page as RequestError).message}</div>
  }

  return <RenderSections sections={(page as PageData).sections} />
}
