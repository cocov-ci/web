'use client'

import React from 'react'

import 'styles/globals.scss'

import Header from 'app/common/Header'
import PageLayout from 'app/common/PageLayout'
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
            <PageLayout>{children}</PageLayout>
          </SegmentsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
