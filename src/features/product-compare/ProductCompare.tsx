import { useEffect, ChangeEvent, useMemo } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  fetchProductsAsync,
  selectCompareProducts,
  selectSelectedItems,
  selectProductsFetchStatus,
  addToCompare,
  removeFromCompare,
} from './productCompareSlice'
import styles from './ProductCompare.module.scss'

import { ProductCard } from './components/ProductCard/ProductCard'
import { getRandomStrId, isArrEqual, groupByFeature } from './utils'

// Should've been filtered out by the backend
// could be moved to separate file
const ignoredFeatures = [
  'salePrice',
  'manufacturerName',
  'grossPrice',
  'BUP_UOM',
  'BUP_Value',
  'uom',
  'productImage',
  'BUP_Conversion',
  'minQuantity',
  'manufacturerImage',
  'name',
  'sku',
  'listPrice',
  'channel',
  'display',
  'atp',
]

export function ProductCompare(): JSX.Element {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectCompareProducts)
  const selectedItems = useAppSelector(selectSelectedItems)
  const status = useAppSelector(selectProductsFetchStatus)

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target
    if (!checked) {
      dispatch(removeFromCompare(name))
    } else {
      dispatch(addToCompare(name))
    }
  }

  const handleRemoveClick = (id: string) => dispatch(removeFromCompare(id))

  const rowData = useMemo(() => {
    function mapRowData() {
      const selectedData = products.filter((p) =>
        selectedItems.includes(p['Artikelnummer'])
      )
      const groupedData = Object.values(groupByFeature(selectedData))

      const sortedData = groupedData
        .sort((a, b) => {
          if (a[0] === 'badges') {
            return 0 // moves to the bottom
          } else {
            return a[0] < b[0] ? 1 : -1 // sorts the rest alphabetically by desc. order
          }
        })
        .reverse() // Reverses the order so that badges are at the top (weird Safari issue)

      // Filtered out the ignored features
      return sortedData.filter(([key]) => !ignoredFeatures.includes(key))
    }
    return mapRowData()
  }, [products, selectedItems])

  // Selection renderer
  const renderSelectedNames = () => {
    return (
      <div className={styles.ListContainer}>
        <div>Je selectie</div>
        <ul>
          {products.map((p) => (
            <li key={p['Artikelnummer']}>
              <label>
                <input
                  data-testid={`${p['Artikelnummer']}-checkbox`}
                  type="checkbox"
                  name={p['Artikelnummer']}
                  checked={selectedItems.includes(p['Artikelnummer'])}
                  onChange={handleOnChange}
                />{' '}
                {p['Toepassing']}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (status === 'loading') {
    return <div className={styles.Spinner}>Loading...</div>
  }

  if (status === 'failed') {
    return (
      <div className={styles.ErrorMsg}>
        Oops, something went wrong! Please try again later.
      </div>
    )
  }

  if (!products.length) {
    return <h2>No products found</h2>
  }

  // console.log(rowData)

  return (
    <div className={styles.Container}>
      <h2 className={styles.Header}>
        {selectedItems.length} producten vergelijken
      </h2>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>{renderSelectedNames()}</th>
            {products
              .filter((p) => selectedItems.includes(p['Artikelnummer']))
              .map((p) => (
                <td key={p['Artikelnummer']}>
                  <ProductCard product={p} onClick={handleRemoveClick} />
                </td>
              ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, i) => {
            // Ignores the first item, because it's the key
            const isEqual = isArrEqual(row.slice(1))

            return (
              <tr
                key={row[0]}
                className={`${!isEqual && styles.highlightedRow}`}
              >
                {row.map((cell) => {
                  if (row[0] === 'badges' && cell !== 'badges') {
                    return (
                      <td className={styles.BadgeCell} key={getRandomStrId()}>
                        {cell.split('|').map((imgSrc) => (
                          <img
                            className={styles.Badge}
                            key={getRandomStrId()}
                            src={imgSrc}
                            alt="product badge"
                          />
                        ))}
                      </td>
                    )
                  }
                  return <td key={getRandomStrId()}>{cell}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
