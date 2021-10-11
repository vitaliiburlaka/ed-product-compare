import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'

import productCompareReducer, {
  ProductCompareState,
  addToCompare,
  removeFromCompare,
  fetchProductsAsync,
} from './productCompareSlice'
import productMock from './__mocks__/product'

describe('counter reducer', () => {
  const initialState: ProductCompareState = {
    products: [],
    status: 'idle',
    error: null,
    selectedItems: [],
  }
  it('should handle initial state', () => {
    expect(productCompareReducer(undefined, { type: 'unknown' })).toEqual({
      products: [],
      status: 'idle',
      error: null,
      selectedItems: [],
    })
  })

  it('should handle addToCompare', () => {
    const productId = '1abc'
    const actual = productCompareReducer(initialState, addToCompare(productId))
    expect(actual.selectedItems.includes(productId)).toEqual(true)
  })

  it('should handle removeFromCompare', () => {
    const productId = '1abc'
    const actual = productCompareReducer(
      { ...initialState, selectedItems: [productId] },
      removeFromCompare('1abc')
    )
    expect(actual.selectedItems.includes(productId)).toEqual(false)
  })

  it('should handle fetchProductsAsync.pending', () => {
    const action = { type: fetchProductsAsync.pending }
    const actual = productCompareReducer(initialState, action)
    expect(actual).toEqual({
      products: [],
      status: 'loading',
      error: null,
      selectedItems: [],
    })
  })

  it('should handle fetchProductsAsync.fulfilled', () => {
    const action = {
      type: fetchProductsAsync.fulfilled,
      payload: { products: [productMock] },
    }
    const actual = productCompareReducer(initialState, action)
    expect(actual).toEqual({
      products: [productMock],
      status: 'idle',
      error: null,
      selectedItems: [productMock['Artikelnummer']],
    })
  })

  it('should handle fetchProductsAsync.rejected', () => {
    const action = { type: fetchProductsAsync.rejected }
    const actual = productCompareReducer(initialState, action)
    expect(actual).toEqual({
      products: [],
      status: 'failed',
      error: 'Oops, something went wrong, please try again later.',
      selectedItems: [],
    })
  })
})

describe('fetchProductsAsync', () => {
  it('should pass', async () => {
    const getSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: { products: [productMock] } })
    const store = configureStore({
      reducer: productCompareReducer,
    })

    await store.dispatch(fetchProductsAsync())

    expect(getSpy).toBeCalledWith(
      'https://5f993a3050d84900163b845a.mockapi.io/eriks/products/all'
    )
    const state = store.getState()
    expect(state).toEqual({
      products: [productMock],
      status: 'idle',
      error: null,
      selectedItems: [productMock['Artikelnummer']],
    })
  })
})
