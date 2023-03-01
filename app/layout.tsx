'use client'

import React from 'react'

import 'styles/globals.scss'
import 'app/common/CodeBlock/CodeBlock_global.scss'

import Header from 'app/common/Header'
import AuthProvider from 'context/AuthContext'
import BannerProvider from 'context/BannerContext'
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
              <BannerProvider>
                <main>{children}</main>
              </BannerProvider>
            </ModalProvider>
          </SegmentsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
