import { Suspense } from "react"
import Link from "next/link"

import { AllPagesLoading, AllPages } from "@/components/_server/AllPages"

export default function HomePage() {
  return (
    <main>
      <Link href="/editor">Criar uma nova página</Link>

      <Suspense fallback={<AllPagesLoading />}>
        <AllPages />
      </Suspense>
    </main>
  )
}
