import { Section } from "@/app/admin/page"
import { RenderComponents } from "./RenderComponents"

// import styles from "./page.module.css"

interface LandingPageProps {
  params: {
    slug: string
  }
}

type PageData = { slug: string; sections: Section[] }
type RequestError = { message: string; error: string; statusCode: number }

export default async function LandingPage({
  params: { slug }
}: LandingPageProps) {
  const response = await fetch(`http://localhost:3001/pages/${slug}`)
  const page = await response.json()

  if (response.status !== 200) {
    return <div>{(page as RequestError).message}</div>
  }

  return <RenderComponents sections={(page as PageData).sections} />
}
