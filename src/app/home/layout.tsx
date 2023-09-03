import LeftSection from '@/components/Layout/LeftSection/LeftSection'
import s from './layout.module.scss'
import RightSection from '@/components/Layout/RightSection/RightSection'
import { Preloader } from './components'
import { getUserByContext } from '@/services'

export const metadata = {
  title: 'Inicio / Twitter',
  description: 'This is a home page of own twitter clone'
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getUserByContext()
  return (
    <>
      <Preloader user={currentUser} />
      <main className={s.main_layout}>
        <section className={s.left_section}>
          <LeftSection />
        </section>
        <section className={s.center_section}>{children}</section>
        <section className={s.right_section}>
          <RightSection />
        </section>
      </main>
    </>
  )
}
