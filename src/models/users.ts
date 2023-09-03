export interface User {
  user_id: number
  first_name: string
  last_name: string
  user_handle: string
  user_picture: string
  email_address?: string
  phone_number?: string
  birthday?: string
  follower_count?: number
  created_at: string
}
