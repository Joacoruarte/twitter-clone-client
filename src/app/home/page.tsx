import { type Post, type User } from '@/models'
import HomeClient from './components/Home/Home'
import { getUserByContext } from './services/getUserByContext.service'
import Preloader from './components/Preloader'
import getPosts from './services/getPosts.service'

export default async function HomePage () {
  const currentUser: User = await getUserByContext()
  const posts: Post[] = await getPosts({ limit: 10 })

  return (
    <>
      <Preloader user={currentUser} posts={posts} />
      <HomeClient />
    </>
  )
}
