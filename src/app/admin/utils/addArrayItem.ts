export const addArrayItem = <Item>(
  array: Item[],
  index: number,
  item: Item
) => {
  const updatedArray = [...array]

  updatedArray.splice(index, 0, item)

  return updatedArray
}
