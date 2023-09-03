import { type CustomPost } from '@/models'
import s from './Post.module.scss'
import Image from 'next/image'
import { formatTwitterTime } from '@/utils'
import { FaRegComment, FaRetweet, FaRegHeart } from 'react-icons/fa'
import Link from 'next/link'

export default function Post ({
  postId,
  userId,
  userPicture,
  fullName,
  userHandle,
  createdAt,
  content,
  comments,
  retweets,
  likes
}: CustomPost) {
  const formatedCreatedAt = formatTwitterTime(new Date(createdAt))

  return (
    <div className={s.container_post}>
      <div className={s.container_user_picture}>
        <Image width={200} height={200} src={userPicture} alt='user picture' />
      </div>
      <div className={s.container_data_of_post}>
        <div className={s.container_full_name_and_user_handle}>
          <Link href={`/user/${userId}`}>
            <p className={s.full_name}>{fullName}</p>
          </Link>
          <Link href={`/user/${userId}`}>
            <span className={s.user_handle}>{userHandle} ·</span>
          </Link>
          <span className={s.created_at}>{formatedCreatedAt}</span>
        </div>

        <div className={s.container_content_of_post}>
          <p>{content}</p>
        </div>

        <div className={s.container_actions_of_post}>
          <div className={`${s.container_action} ${s.comment}`}>
            <FaRegComment />
            <span>{comments}</span>
          </div>
          <div className={`${s.container_action} ${s.retweet}`}>
            <FaRetweet />
            <span>{retweets}</span>
          </div>
          <div className={`${s.container_action} ${s.heart}`}>
            <FaRegHeart />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
