import s from './RightSection.module.scss'
import { HiOutlineSearch } from 'react-icons/hi'

export default function RightSection () {
  return (
    <div className={s.container_right_section}>
      <div className={s.container_search}>
        <HiOutlineSearch className={s.search_icon} />
        <input className={s.input_search} type='text' placeholder='Buscar' />
      </div>
    </div>
  )
}
