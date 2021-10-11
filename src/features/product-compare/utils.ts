import { Product } from './productCompareSlice'

// Generates random string ids
export const getRandomStrId = () => Math.random().toString(36).substring(2, 15)

// Checks if the array of products features has different values
export const isArrEqual = (arr: Array<string | number | boolean>) => {
  return arr.every((item) => item === arr[0])
}

interface GroupedData {
  [key: string]: string[]
}

// Groups the products data by the feature key
export function groupByFeature(list: Product[]) {
  const result: GroupedData = {}
  if (!list.length) {
    return result
  }

  // for loop would be faster, but this is easier to read
  list.forEach((item: any) => {
    Object.keys(item).forEach((key) => {
      if (!result[key]) {
        result[key] = [key]
        result[key].push(item[key])
      } else {
        result[key].push(item[key])
      }
    })
  })

  return result
}
