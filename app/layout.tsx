'use client'

import React from 'react'

import 'styles/globals.scss'
import 'app/common/CodeBlock/CodeBlock_global.scss'

import Header from 'app/common/Header'
import AuthProvider from 'context/AuthContext'
import ModalProvider from 'context/ModalContext'
import SegmentsProvider from 'context/SegmentsContext'
import { satoshi } from 'utils/fonts'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <AuthProvider>
          <SegmentsProvider>
            <ModalProvider>
              <Header />
              <main>{children}</main>
            </ModalProvider>
          </SegmentsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
