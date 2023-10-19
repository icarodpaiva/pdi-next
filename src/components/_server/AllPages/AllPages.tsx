import Link from "next/link"

import { DeletePage } from "../../_client/DeletePage"

import style from "./AllPages.module.css"

export const AllPages = async () => {
  // // To show Loading
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const response = await fetch("http://localhost:3001/pages/", {
    cache: "no-store"
  })

  if (response.status === 200) {
    const pages: { slug: string }[] = await response.json()

    return (
      <>
        <h1>Todas as Páginas</h1>

        <ul className={style.pagesContainer}>
          {pages.map(({ slug }) => (
            <li key={slug} className={style.pageContainer}>
              <p>
                Página: <strong>{slug}</strong>
              </p>

              <div className={style.buttonsContainer}>
                <Link href={`/lp/${slug}`}>Acessar</Link>
                <Link href={`/editor/${slug}`}>Editar</Link>
                <DeletePage slug={slug}>Deletar</DeletePage>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  return <h1>Nenhuma página encontrada</h1>
}
