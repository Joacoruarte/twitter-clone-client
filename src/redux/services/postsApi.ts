import { type Post } from '@/models'
import { getCookie } from '@/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  addNewPostAsync,
  cleanPosts,
  setMorePostsAsync,
  setPostsAsync
} from '../features/postSlice'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_URL}/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('set-cookie')}`
    }
  }),
  endpoints: (builder) => ({
    getMorePosts: builder.query<
    { tweets: Post[] },
    { offset: number, limit: number, userId?: string }
    >({
      query: ({ offset, limit, userId }) =>
        `tweets?offset=${offset}&limit=${limit}${
          userId != null ? `&userId=${userId}` : ''
        }`,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const reponse = await queryFulfilled
          const { data, meta } = reponse
          if (meta?.response?.status === 401) {
            throw new Error('Unauthorized')
          }
          const tweets = data?.tweets
          dispatch(setMorePostsAsync(tweets))
        } catch (error: any) {
          throw error.message
        }
      }
    }),
    getPostsForUserFollowing: builder.query<
    { tweets: Post[] },
    { userId: string }
    >({
      query: ({ userId }) => `tweets?userId=${userId}`,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const reponse = await queryFulfilled
          const { data, meta } = reponse
          if (meta?.response?.status === 401) {
            throw new Error('Unauthorized')
          }
          const tweets = data?.tweets
          dispatch(cleanPosts())
          dispatch(setPostsAsync(tweets))
        } catch (error: any) {
          throw error.message
        }
      }
    }),
    getPostsForUser: builder.query<{ tweets: Post[] }, null>({
      query: () => 'tweets',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const reponse = await queryFulfilled
          const { data, meta } = reponse
          if (meta?.response?.status === 401) {
            throw new Error('Unauthorized')
          }
          const tweets = data?.tweets
          dispatch(cleanPosts())
          dispatch(setPostsAsync(tweets))
        } catch (error: any) {
          throw error.message
        }
      }
    }),
    createPost: builder.mutation<{ tweet: Post }, { content: string }>({
      query: ({ content }) => ({
        url: 'tweets',
        method: 'POST',
        body: { content }
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const reponse = await queryFulfilled
          const { data, meta } = reponse
          if (meta?.response?.status === 401) {
            throw new Error('Unauthorized')
          }
          const tweet = data?.tweet
          dispatch(addNewPostAsync(tweet))
        } catch (error: any) {
          throw error.message
        }
      }
    })
  })
})

export const {
  useLazyGetPostsForUserQuery,
  useLazyGetPostsForUserFollowingQuery,
  useCreatePostMutation,
  useLazyGetMorePostsQuery
} = postsApi
