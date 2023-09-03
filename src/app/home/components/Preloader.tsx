'use client'

import { type Post, type User } from '@/models'
import { setUser } from '@/redux/features/authSlice'
import { setPosts } from '@/redux/features/postSlice'
import { store } from '@/redux/store'
import { useRef } from 'react'

interface Props {
  user?: User
  posts?: Post[]
}

export default function Preloader ({ user, posts }: Props) {
  const loaded = useRef(false)
  if (!loaded.current) {
    (user != null) && store.dispatch(setUser(user));
    (posts != null) && store.dispatch(setPosts(posts))
    loaded.current = true
  }
  return null
}
