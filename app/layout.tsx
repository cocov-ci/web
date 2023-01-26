'use client'

import React from 'react'

import 'styles/globals.scss'

import Header from 'app/common/Header'
import AuthProvider from 'context/AuthContext'
import SegmentsProvider from 'context/SegmentsContext'
import { satoshi } from 'utils/fonts'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <AuthProvider>
          <SegmentsProvider>
            <Header />
            <main>{children}</main>
          </SegmentsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
