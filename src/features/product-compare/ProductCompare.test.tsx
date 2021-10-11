import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { getDefaultMiddleware } from '@reduxjs/toolkit'
import { store, RootState, AppDispatch } from '../../app/store'

import { ProductCompare } from './ProductCompare'
import productMock from './__mocks__/product'

const mockStore = configureStore<RootState, AppDispatch>(getDefaultMiddleware())

describe('<ProductCompare />', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <ProductCompare />
      </Provider>
    )
    expect(container).toBeInTheDocument()
  })

  it('should render product list', () => {
    const store = mockStore({
      productCompare: {
        products: [productMock],
        status: 'idle',
        error: null,
        selectedItems: [productMock['Artikelnummer']],
      },
    })
    const { getAllByText } = render(
      <Provider store={store}>
        <ProductCompare />
      </Provider>
    )

    expect(getAllByText(productMock['Artikelnummer'])[0]).toBeInTheDocument()
  })

  it('should select product on checkbox click', () => {
    const store = mockStore({
      productCompare: {
        products: [productMock],
        status: 'idle',
        error: null,
        selectedItems: [productMock['Artikelnummer']],
      },
    })
    const { getAllByTestId } = render(
      <Provider store={store}>
        <ProductCompare />
      </Provider>
    )

    const checkbox = getAllByTestId(
      `${productMock['Artikelnummer']}-checkbox`
    )[0]

    expect(checkbox).toBeChecked()

    fireEvent.click(checkbox)
  })
})
