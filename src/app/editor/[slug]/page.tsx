interface LandingPageProps {
  params: {
    slug: string
  }
}

type RequestError = { message: string; error: string; statusCode: number }

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
