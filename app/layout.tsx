'use client'

import React from 'react'
import { SWRConfig } from 'swr'

import 'styles/globals.scss'

import Header from 'app/common/Header'
import AuthProvider from 'context/AuthContext'
import fetcher from 'utils/fetchClient'
import { satoshi } from 'utils/fonts'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
          <AuthProvider>
            <Header />
            <main>{children}</main>
          </AuthProvider>
        </SWRConfig>
      </body>
    </html>
  )
}

export default RootLayout
