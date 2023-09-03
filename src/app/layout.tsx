import { Providers } from '@/redux/providers'
import type { Metadata } from 'next'
import React from 'react'
import '../styles/global.scss'

export const metadata: Metadata = {
  title: 'Twitter/X clone',
  description: 'Project to learn Next.js 13',
  icons: {
    icon: './favicon.ico'
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
