import localFont from '@next/font/local'
import React from 'react'

import 'styles/globals.scss'

import Header from 'app/common/Header'
import AuthProvider from 'context/AuthContext'

const satoshi = localFont({
  src: '../public/fonts/Satoshi.ttf',
  variable: '--satoshi-font',
})

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
