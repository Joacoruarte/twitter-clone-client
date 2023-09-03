'use client'

import Spinner from '@/components/Loaders/Spinner/Spinner'
import { type Post as PostType } from '@/models'
import { useAppSelector } from '@/redux/hooks'
import { useLazyGetMorePostsQuery } from '@/redux/services/postsApi'
import { toCapitalizeCase } from '@/utils/toCapitalizeCase'
import { Fragment, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import Post from '../Post/Post'
import s from './Posts.module.scss'
import { SwitchSectionEnum, type SwitchSection } from '../Home/Home'

export default function Posts ({
  switchSection
}: {
  switchSection: SwitchSection
}) {
  const posts = useAppSelector((state) => state.post.posts)
  const userId = useAppSelector((state) => state.auth.user?.user_id)
  const [getMorePosts, { isFetching }] = useLazyGetMorePostsQuery()
  const [noFetchMore, setNoFetchMore] = useState<boolean>(false)

  const handleGetMorePosts = () => {
    if (noFetchMore) return
    if (switchSection === SwitchSectionEnum.FOR_YOU) {
      getMorePosts({ offset: posts.length, limit: 10 }).then((res) => {
        if (res.data?.tweets?.length === 0) {
          setNoFetchMore(true)
        }
      })
    } else if (switchSection === SwitchSectionEnum.FOLLOWING) {
      getMorePosts({
        userId: userId.toString(),
        offset: posts.length,
        limit: 10
      }).then((res) => {
        if (res.data?.tweets?.length === 0) {
          setNoFetchMore(true)
        }
      })
    }
  }

  useEffect(() => {
    setNoFetchMore(false)
  }, [switchSection])

  return (
    <div className={s.container_posts}>
      {Array.isArray(posts) &&
        posts.map((post: PostType, index: number) => {
          const formatedName = `${toCapitalizeCase(
            post?.user?.first_name
          )} ${toCapitalizeCase(post?.user?.last_name)}`

          return (
            <Fragment key={post?.tweet_id}>
              <Post
                postId={post?.tweet_id}
                userId={post?.user?.user_id}
                userPicture={post?.user?.user_picture}
                fullName={formatedName}
                userHandle={post?.user?.user_handle}
                createdAt={post?.created_at}
                content={post?.tweet_text}
                comments={post?.num_comments}
                retweets={post?.num_retweets}
                likes={post?.num_likes}
              />
              {index === posts?.length - 1 && (
                <Waypoint onEnter={handleGetMorePosts} />
              )}
            </Fragment>
          )
        })}

      {isFetching && (
        <div className={s.container_loading_spinner}>
          <Spinner />
        </div>
      )}
    </div>
  )
}
