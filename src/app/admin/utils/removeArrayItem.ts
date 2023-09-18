export const removeArrayItem = <Item>(array: Item[], index: number) => {
  const updatedArray = [...array]

  updatedArray.splice(index, 1)

  return updatedArray
}
