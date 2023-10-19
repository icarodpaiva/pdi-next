import { arrayByNumber } from "@/utils/arrayByNumber"

export default function Loading() {
  const skeletons = arrayByNumber(4)

  return (
    <main>
      <ul>
        {skeletons.map(skeleton => (
          <li
            key={skeleton}
            style={{ height: 200, background: "#e8e8e8", marginBottom: 16 }}
          />
        ))}
      </ul>
    </main>
  )
}
