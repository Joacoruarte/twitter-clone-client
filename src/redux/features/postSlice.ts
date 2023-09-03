import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Post } from '@/models'

const initialState = {
  posts: [] as Post[]
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
    },
    addNewPost: (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts]
    },
    setMorePosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload]
    },
    cleanPosts: (state) => {
      state.posts = []
    }
  }
})

export const setPostsAsync = (posts: Post[]) => async (dispatch: any) => dispatch(setPosts(posts))
export const addNewPostAsync = (post: Post) => async (dispatch: any) => dispatch(addNewPost(post))
export const setMorePostsAsync = (posts: Post[]) => async (dispatch: any) => dispatch(setMorePosts(posts))
export const { setPosts, addNewPost, setMorePosts, cleanPosts } = postSlice.actions

export default postSlice.reducer
