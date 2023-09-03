import postSlice from './features/postSlice'
import authReducer from './features/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './services/userApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { postsApi } from './services/postsApi'

export const store = configureStore({
  reducer: {
    post: postSlice,
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, postsApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
