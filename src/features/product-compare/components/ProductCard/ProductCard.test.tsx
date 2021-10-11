import { render, fireEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import productMock from '../../__mocks__/product'

describe('<ProductCard />', () => {
  const defaultProps = { product: productMock, onClick: () => {} }

  it('renders without crashing', () => {
    const { container } = render(<ProductCard {...defaultProps} />)
    expect(container).toBeInTheDocument()
  })

  it('should call onClick with productId on BtnRemove click', () => {
    const onClickMockFn = jest.fn()
    const props = { ...defaultProps, onClick: onClickMockFn }
    const { getByTestId } = render(<ProductCard {...props} />)

    fireEvent.click(getByTestId('btn-remove'))

    expect(onClickMockFn).toHaveBeenCalledWith(productMock['Artikelnummer'])
  })
})
