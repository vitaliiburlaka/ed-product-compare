import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import productCompareReducer from '../features/product-compare/productCompareSlice'

export const store = configureStore({
  reducer: {
    productCompare: productCompareReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
