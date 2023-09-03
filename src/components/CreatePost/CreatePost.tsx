'use client'
import Image from 'next/image'
import s from './CreatePost.module.scss'
import { useAppSelector } from '@/redux/hooks'
import { useRef, useState } from 'react'
import { useCreatePostMutation } from '@/redux/services/postsApi'

export default function CreatePost () {
  const user = useAppSelector((state) => state.auth.user)
  const [post, setPost] = useState('')
  const [createPost] = useCreatePostMutation()
  const textareRef = useRef<HTMLTextAreaElement>(null)

  const handleChangePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    if (textareRef.current !== null) {
      if (value.length === 0) {
        textareRef.current.style.height = '50px'
      } else {
        const { scrollHeight } = textareRef.current
        textareRef.current.style.height = 'max-content'
        textareRef.current.style.height = `${scrollHeight}px`
      }
    }
    setPost(value)
  }

  const handleCreatePost = async () => {
    await createPost({ content: post })
    setPost('')
  }

  return (
    <div className={s.container_create_post}>
      <div className={s.subcontainer_create_post}>
        <div className={s.container_of_avatar}>
          <div className={s.container_avatar}>
            {user?.user_picture !== '' && (
              <Image
                width={200}
                height={200}
                src={user?.user_picture}
                alt='avatar'
              />
            )}
          </div>
        </div>

        <textarea
          className={s.textarea}
          placeholder='¡¿Qué esta pasando?!'
          value={post}
          onChange={handleChangePost}
          ref={textareRef}
        />
      </div>

      <div className={s.container_buttons}>
        <div className={s.container_post_button}>
          <button
            onClick={handleCreatePost}
            disabled={post?.length === 0}
          >
            Postear
          </button>
        </div>
      </div>
    </div>
  )
}
