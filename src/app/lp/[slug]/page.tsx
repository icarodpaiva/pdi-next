"use client"

import { useTemporaryPagesContext } from "@/app/contexts/TemporaryPagesContext"
import { sectionComponents } from "@/app/admin/helpers/sections"

// import styles from "./page.module.css"

interface LandingPageProps {
  params: {
    slug: string
  }
}

export default function LandingPage({ params: { slug } }: LandingPageProps) {
  const { pages } = useTemporaryPagesContext()

  const page = pages?.find(page => page.slug === slug)

  return (
    <main>
      {page?.pageSectionsData.map(({ pageSection, formData: props }, index) => {
        const PageSectionComponent = sectionComponents[pageSection]

        if (PageSectionComponent) {
          return <PageSectionComponent key={index} {...props} />
        }

        return null
      })}
    </main>
  )
}
