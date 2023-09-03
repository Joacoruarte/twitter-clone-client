import LeftSection from '@/components/Layout/LeftSection/LeftSection'
import s from './layout.module.scss'
import RightSection from '@/components/Layout/RightSection/RightSection'

export const metadata = {
  title: 'Inicio / Twitter',
  description: 'This is a home page of own twitter clone'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className={s.main_layout}>
      <section className={s.left_section}>
        <LeftSection />
      </section>
      <section className={s.center_section}>{children}</section>
      <section className={s.right_section}>
        <RightSection />
      </section>
    </main>
  )
}
