import axios, { AxiosPromise } from 'axios'

export function fetchProducts(param = 'all'): AxiosPromise {
  return axios.get(
    'https://5f993a3050d84900163b845a.mockapi.io/eriks/products/all'
  )
}
