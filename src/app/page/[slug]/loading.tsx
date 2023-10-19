export default function Loading() {
  const skeletons = Array.from({ length: 4 }).map((_, index) => (
    <li
      key={index}
      style={{ height: 200, background: "#e8e8e8", marginBottom: 16 }}
    />
  ))

  return (
    <main>
      <ul>{skeletons}</ul>
    </main>
  )
}
