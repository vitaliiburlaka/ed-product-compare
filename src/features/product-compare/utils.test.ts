import { getRandomStrId, isArrEqual, groupByFeature } from './utils'
import productMock from './__mocks__/product'

describe('getRandomStrId', () => {
  it('should return random string id', () => {
    const id1 = getRandomStrId()
    const id2 = getRandomStrId()

    expect(id1).not.toEqual(id2)
  })
})

describe('isArrEqual', () => {
  it('should return true if array values are equal', () => {
    const arr = ['a', 'a', 'a']

    expect(isArrEqual(arr)).toBeTruthy()
  })

  it('should return false if array values are NOT equal', () => {
    const arr = ['a', 'ab', 'a']

    expect(isArrEqual(arr)).toBeFalsy()
  })
})

describe('groupByFeature', () => {
  // Could be moved to a separate file
  const groupedData = {
    Toepassing: ['Toepassing', 'Voedsel en dranken'],
    salePrice: ['salePrice', '1.41'],
    manufacturerName: ['manufacturerName', ''],
    Hardheid: ['Hardheid', '70'],
    grossPrice: ['grossPrice', '1.71'],
    BUP_UOM: ['BUP_UOM', ''],
    Artikelnummer: ['Artikelnummer', '115E19'],
    stepQuantity: ['stepQuantity', '5'],
    BUP_Value: ['BUP_Value', ''],
    badges: [
      'badges',
      'https://eriksdigitalcdn.azureedge.net/shop/thumb40/hlr-system/egt/pubnl/pim_icons/rohs-icon-nl.jpg|https://eriksdigitalcdn.azureedge.net/shop/thumb40/hlr-system/egt/pubnl/pim_icons/rohs-icon-nl.jpg|https://eriksdigitalcdn.azureedge.net/shop/thumb40/hlr-system/egt/pubnl/pim_icons/omega-slang-icon-nl.jpg|https://eriksdigitalcdn.azureedge.net/shop/thumb40/hlr-system/egt/pubnl/pim_icons/o-t-symbol-icon-nl.jpg',
    ],
    uom: ['uom', 'Stuk'],
    Kleur: ['Kleur', 'Zwart'],
    productImage: [
      'productImage',
      'https://eriksdigitalcdn.azureedge.net/shop/thumb/hlr-system/egt/pubnl/industriele slangen/rubber slangen/chemieslangen/rubber-chemieslang-rx-ultrafixx-md-pinl-nl.jpg',
    ],
    Temperatuurgebied: ['Temperatuurgebied', 'van  -50  tot  150'],
    BUP_Conversion: ['BUP_Conversion', ''],
    minQuantity: ['minQuantity', '5'],
    manufacturerImage: ['manufacturerImage', ''],
    name: [
      'name',
      'O-ring EPDM 70 shore - Voedsel (Binnen Ø=1.25 Snoer Ø=2.62; AS568- 102)',
    ],
    Materiaal: ['Materiaal', 'EPDM'],
    sku: ['sku', '115E19'],
    Snoerdikte: ['Snoerdikte', '2.62'],
    'Inwendige diameter': ['Inwendige diameter', '1.25'],
    'Maat volgens AS568': ['Maat volgens AS568', '102'],
    listPrice: ['listPrice', '1.41'],
    channel: ['channel', 'nl_NL'],
    display: ['display', true],
    atp: ['atp', {}],
  }

  it('should return object of grouped by feature lists', () => {
    expect(groupByFeature([productMock])).toEqual(groupedData)
  })

  it('should return an empty object empty array is provided', () => {
    expect(groupByFeature([])).toEqual({})
  })
})
