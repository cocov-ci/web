import localFont from '@next/font/local'
import React from 'react'

import 'styles/globals.scss'

import AuthProvider from 'app/AuthContext'
import Header from 'app/common/Header'

const satoshi = localFont({ src: '../public/fonts/Satoshi.ttf' })

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
