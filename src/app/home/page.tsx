import { type Post } from '@/models'
import { Home as HomeClient, Preloader } from './components'
import { getPosts } from '@/services'

export default async function HomePage () {
  const posts: Post[] = await getPosts({ limit: 10 })

  return (
    <>
      <Preloader posts={posts ?? []} />
      <HomeClient />
    </>
  )
}
