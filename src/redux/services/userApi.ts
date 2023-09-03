/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface User {
  id: number
  name: string
  username: string
  email: string
}

export const userApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => 'users' // https://jsonplaceholder.typicode.com/users
    }),
    getUserById: builder.query<User[], { id: string }>({
      query: ({ id }) => `users/${id}` // https://jsonplaceholder.typicode.com/users/1
    })
  })
})

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi
