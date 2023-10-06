"use client"

import { useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Section } from "./components/Section"
import { SectionsModal } from "./components/SectionsModal"

import { useTemporaryPagesContext } from "../contexts/TemporaryPagesContext"
import { sectionComponents } from "./helpers/sections"
import { addArrayItem } from "./utils/addArrayItem"

import style from "./page.module.css"

export interface PageSectionData {
  pageSection: string
  formData: { [key: string]: string }
}

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [slug, setSlug] = useState("")
  const [pageSectionIndex, setPageSectionIndex] = useState(0)
  const [pageSectionsData, setPageSectionsData] = useState<PageSectionData[]>(
    []
  )

  const { push } = useRouter()
  const { setPages } = useTemporaryPagesContext()

  const handleOpenModal = (index: number) => {
    setIsModalOpen(true)
    setPageSectionIndex(index)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const addPageSection = (pageSectionData: PageSectionData, index: number) => {
    setPageSectionsData(prevPageSectionsData =>
      addArrayItem(prevPageSectionsData, index, pageSectionData)
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(encodeURIComponent(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setPages?.(prevPages => [...prevPages, { slug, pageSectionsData }])

    push(`/lp/${encodeURIComponent(slug)}`)
  }

  return (
    <div className={style.main}>
      <div className={style.editorContainer}>
        <h1 className={style.gridTitle}>Editor</h1>
        <hr className={style.divider} />

        <Link href={`/lp/${slug}`}>Navegar para LP</Link>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="page-slug">Nome da Página</label>

            <input
              id="page-slug"
              name="page-slug"
              type="text"
              placeholder="Nome da Página"
              value={slug}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          {pageSectionsData.length <= 0 ? (
            <button
              type="button"
              onClick={() => handleOpenModal(0)}
              className={style.addSectionButton}
            >
              +
            </button>
          ) : (
            pageSectionsData.map((pageSectionData, index) => (
              <div key={index}>
                {index === 0 && (
                  <button
                    type="button"
                    onClick={() => handleOpenModal(index)}
                    className={style.addSectionButton}
                  >
                    +
                  </button>
                )}

                <Section
                  pageSectionData={pageSectionData}
                  index={index}
                  isUpButtonDisabled={index === 0}
                  isDownButtonDisabled={index === pageSectionsData.length - 1}
                  addPageSection={addPageSection}
                  setPageSectionsData={setPageSectionsData}
                />

                <button
                  type="button"
                  onClick={() => handleOpenModal(index + 1)}
                  className={style.addSectionButton}
                >
                  +
                </button>
              </div>
            ))
          )}

          <button type="submit">Salvar Página</button>
        </form>

        {isModalOpen && (
          <SectionsModal
            pageSectionIndex={pageSectionIndex}
            addPageSection={addPageSection}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>

      <div className={style.previewContainer}>
        <div className={style.previewContent}>
          <h1 className={style.gridTitle}>Pré-visualização</h1>
          <hr className={style.divider} />

          <div className={style.sectionsContainer}>
            {pageSectionsData.map(({ pageSection, formData: props }, index) => {
              const PageSectionComponent = sectionComponents[pageSection]

              if (PageSectionComponent) {
                return <PageSectionComponent key={index} {...props} />
              }

              return null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
