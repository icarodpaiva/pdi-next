import Link from "next/link"
import { PagesSkeleton, Pages } from "./components/Pages"
import { Suspense } from "react"

export default function LandingPages() {
  return (
    <main>
      <Link href="/editor">Criar uma nova página</Link>

      <Suspense fallback={<PagesSkeleton />}>
        <Pages />
      </Suspense>
    </main>
  )
}
