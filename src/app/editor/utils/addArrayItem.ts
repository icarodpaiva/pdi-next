export const addArrayItem = <T>(array: T[], index: number, item: T) => {
  const updatedArray = [...array]

  updatedArray.splice(index, 0, item)

  return updatedArray
}
