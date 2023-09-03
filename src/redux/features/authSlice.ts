import { type User } from '@/models'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Props {
  user: User
}

const initialState: Props = {
  user: {
    user_id: 0,
    user_handle: '',
    user_picture: '',
    email_address: '',
    created_at: '',
    first_name: '',
    last_name: '',
    birthday: '',
    follower_count: 0,
    phone_number: ''
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
