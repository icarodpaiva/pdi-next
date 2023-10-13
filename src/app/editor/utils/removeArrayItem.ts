export const removeArrayItem = <T>(array: T[], index: number) => {
  const updatedArray = [...array]

  updatedArray.splice(index, 1)

  return updatedArray
}
