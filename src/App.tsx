import { ProductCompare } from './features/product-compare/ProductCompare'
import styles from './App.module.scss'

export function App() {
  return (
    <div className={styles.App}>
      {/* Here could be routing with more pages */}
      <ProductCompare />
    </div>
  )
}
