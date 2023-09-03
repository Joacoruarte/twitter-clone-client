import type { Metadata } from 'next'
import React from 'react'
import '../styles/global.scss'
import { Providers } from '@/redux/providers'
import { headers } from 'next/headers'
import { Preloader } from './home/components'
import { type User } from '@/models'
import { getUserByContext } from '@/services'

export const metadata: Metadata = {
  title: 'Twitter/X clone',
  description: 'Project to learn Next.js 13',
  icons: {
    icon: './favicon.ico'
  }
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') ?? ''

  if (pathname !== '/') {
    const currentUser: User = await getUserByContext()

    return (
      <html lang='en'>
      <body>
        <Preloader user={currentUser} />
        <Providers>{children}</Providers>
      </body>
    </html>
    )
  }

  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
