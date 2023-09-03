'use client'
import CreatePost from '@/components/CreatePost/CreatePost'
import { useState } from 'react'
import { useLazyGetPostsForUserFollowingQuery, useLazyGetPostsForUserQuery } from '@/redux/services/postsApi'
import { useAppSelector } from '@/redux/hooks'
import { HeaderHome, Posts } from '..'

export enum SwitchSectionEnum {
  FOR_YOU = 'FOR_YOU',
  FOLLOWING = 'FOLLOWING',
}

export type SwitchSection =
  | SwitchSectionEnum.FOR_YOU
  | SwitchSectionEnum.FOLLOWING

export default function HomeClient () {
  const [getPostForUser] = useLazyGetPostsForUserQuery()
  const [getPostForUserFollowing] = useLazyGetPostsForUserFollowingQuery()
  const userId = useAppSelector((state) => state.auth.user?.user_id)
  const [switchSection, setSwitchSection] = useState<SwitchSection>(
    SwitchSectionEnum.FOR_YOU
  )

  const handleChangeSwitchSection = (section: SwitchSection) => {
    setSwitchSection(section)
    if (section === SwitchSectionEnum.FOR_YOU && switchSection !== SwitchSectionEnum.FOR_YOU) {
      getPostForUser(null)
    } else if (section === SwitchSectionEnum.FOLLOWING && switchSection !== SwitchSectionEnum.FOLLOWING) {
      getPostForUserFollowing({ userId: userId.toString() })
    }
  }

  return (
    <>
      <HeaderHome
        switchSection={switchSection}
        handleChangeSwitchSection={handleChangeSwitchSection}
      />
      <CreatePost />
      <Posts switchSection={switchSection} />
    </>
  )
}
