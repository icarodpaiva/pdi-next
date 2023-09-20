"use client"

import Link from "next/link"

import { useTemporaryPagesContext } from "@/app/contexts/TemporaryPagesContext"

import { sectionComponents } from "@/app/admin/utils"

interface LandingPageProps {
  params: {
    slug: string
  }
}

export default function LandingPage({ params: { slug } }: LandingPageProps) {
  const { pages } = useTemporaryPagesContext()

  const page = pages?.find(page => page.slug === slug)

  return (
    <>
      <Link href="/admin">Criar mais páginas</Link>

      <div>
        {page?.pageSectionsData.map(
          ({ pageSection, formData: props }, index) => {
            const PageSectionComponent = sectionComponents[pageSection]

            if (PageSectionComponent) {
              return <PageSectionComponent key={index} {...props} />
            }

            return null
          }
        )}
      </div>
    </>
  )
}