
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rooteReducer } from './reducer/RootReducer'

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })
export const store = configureStore({
    reducer: rooteReducer,
    middleware:customizedMiddleware
})


export type RootState = ReturnType<typeof store.getState> 
export type Appdispatch  = typeof store.dispatch