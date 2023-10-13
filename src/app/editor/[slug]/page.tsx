import { RequestError } from "@/app/types/PagesRequests"

interface LandingPageProps {
  params: {
    slug: string
  }
}

export default async function PageEditor({
  params: { slug }
}: LandingPageProps) {
  const response = await fetch(`http://localhost:3001/pages/${slug}`)
  const page = await response.json()

  if (response.status !== 200) {
    return <div>{(page as RequestError).message}</div>
  }

  return <div>{JSON.stringify(page)}</div>
}
