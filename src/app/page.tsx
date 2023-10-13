import Link from "next/link"
import { PagesLoading, Pages } from "./components/Pages"
import { Suspense } from "react"

export default function LandingPages() {
  return (
    <main>
      <Link href="/editor">Criar uma nova página</Link>

      <Suspense fallback={<PagesLoading />}>
        <Pages />
      </Suspense>
    </main>
  )
}
