/** When false, ecommerce collections are hidden in admin and cart/shop/checkout are hidden on the frontend. Models stay in DB. */
export const ECOMMERCE_ENABLED = process.env.ECOMMERCE_ENABLED === 'true'

export type SortFilterItem = {
  reverse: boolean
  slug: null | string
  title: string
}

export const defaultSort: SortFilterItem = {
  slug: null,
  reverse: false,
  title: 'Alphabetic A-Z',
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  { slug: '-createdAt', reverse: true, title: 'Latest arrivals' },
  { slug: 'priceInUSD', reverse: false, title: 'Price: Low to high' }, // asc
  { slug: '-priceInUSD', reverse: true, title: 'Price: High to low' },
]
