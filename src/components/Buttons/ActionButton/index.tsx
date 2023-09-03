'use client'
import React, { useState } from 'react'
import s from './index.module.scss'

interface Props {
  text: string
  color?: string
  backgroundColor?: string
  borderColor?: string
  padding?: string
  border?: string
  fontSize?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  hoverBackgroundColor?: string
  handleClick?: () => void
}

export default function ActionButton ({
  text,
  color = '#fff',
  backgroundColor = 'rgb(29, 155, 240)',
  fontSize = '',
  border = '',
  hoverBackgroundColor = '',
  padding = '',
  type = 'button',
  disabled = false,
  handleClick = () => {}
}: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const buttonStyles = {
    color,
    backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor,
    fontSize,
    padding,
    border
  }

  return (
    <button
      className={s.action_button}
      style={buttonStyles}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      onMouseEnter={() => { setIsHovered(true) }}
      onMouseLeave={() => { setIsHovered(false) }}
    >
      {text}
    </button>
  )
}
