import { Product } from '../../productCompareSlice'

import styles from './ProductCard.module.scss'

interface Props {
  product: Product
  onClick: (productId: string) => void
}

export function ProductCard({ product, onClick }: Props): JSX.Element {
  const handleOnClick = (): void => {
    onClick(product['Artikelnummer'])
  }

  return (
    <div className={styles.Container}>
      <button
        className={styles.BtnRemove}
        onClick={handleOnClick}
        data-testid="btn-remove"
      >
        X
      </button>
      <div className={styles.Image}>
        <img src={product.productImage} alt={product['Toepassing']} />
      </div>
      <div className={styles.Name}>{product['Toepassing']}</div>
      <div className={styles.Details}>
        <div className={styles.Price}>{product.listPrice}</div>
        <div className={styles.QtyInfo}>per {product.uom} / excl. btw</div>
      </div>
    </div>
  )
}
