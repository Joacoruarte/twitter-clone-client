'use client'
import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import s from './SelectBirthDay.module.scss'
import { type CustomEvent } from '../../models'

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

interface Props {
  onChargeUserData: (e: React.ChangeEvent<HTMLInputElement> | CustomEvent) => void
}

export default function SelectBirthDay ({ onChargeUserData }: Props) {
  const [date, setDate] = useState({ month: '', day: '', year: '' })

  const handleDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setDate({
      ...date,
      [name]: value
    })
  }

  const sortNumbers = (a: number, b: number) => {
    if (a > b) {
      return -1
    } else if (a < b) {
      return 1
    } else {
      return 0
    }
  }

  useEffect(() => {
    if (!Object.values(date).every((value) => value === '') && !Object.values(date).includes('')) {
      const birthday = `${date.month}-${date.day}-${date.year}`
      const time = new Date(birthday).getTime()
      onChargeUserData({ target: { name: 'birthday', value: time } })
    }
  }, [date])

  return (
    <>
      <div className={s.select_month}>
        <select onChange={handleDate} name='month' defaultValue=''>
          <option value='' disabled></option>
          {months.map((month, index) => (
            <option key={month} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <IoIosArrowDown className={s.arrow} />
      </div>
      <div className={s.select_day}>
        <select onChange={handleDate} name='day' defaultValue=''>
          <option value='' disabled></option>
          {Array.from(Array(31).keys()).map((day) => (
            <option key={day} value={day + 1}>
              {day + 1}
            </option>
          ))}
        </select>
        <IoIosArrowDown className={s.arrow} />
      </div>

      <div className={s.select_year}>
        <select onChange={handleDate} name='year' defaultValue=''>
          <option value='' disabled></option>
          {Array.from(Array(104).keys())
            .sort(sortNumbers)
            .map((year) => (
              <option key={year} value={year + 1920}>
                {year + 1920}
              </option>
            ))}
        </select>
        <IoIosArrowDown className={s.arrow} />
      </div>
    </>
  )
}
