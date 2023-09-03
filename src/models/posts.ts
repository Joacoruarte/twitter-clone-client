import { type User } from '.'

export interface Post {
  tweet_id: number
  user_id: number
  tweet_text: string
  num_likes: number
  num_retweets: number
  num_comments: number
  created_at: string
  user: User
}

export interface CustomPost {
  postId: number
  userId: number
  userPicture: string
  fullName: string
  userHandle: string
  createdAt: string
  content: string
  comments: number
  retweets: number
  likes: number
}
