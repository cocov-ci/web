'use client'

import React, { createContext, useMemo, useState } from 'react'

import Banner, { BannerProps } from 'app/common/Banner'

interface BannerPropsContext {
  showBanner: (arg: BannerProps) => void
}
export const BannerContext = createContext<BannerPropsContext>({
  showBanner: () => null,
})

const BannerProvider = ({ children }: { children: React.ReactNode }) => {
  const [initModal, setInitModal] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [content, setContent] = useState<BannerProps>()

  const showBanner = (content: BannerProps) => {
    setInitModal(true)
    setContent(content)

    setTimeout(() => {
      setIsVisible(true)
    }, 1000)
  }

  const hideBanner = () => {
    setIsVisible(false)
    setTimeout(() => {
      setInitModal(false)
      setContent(undefined)
    }, 150)
  }

  const memoizedValue = useMemo(
    () => ({
      showBanner,
      hideBanner,
    }),
    [showBanner, hideBanner],
  )

  return (
    <BannerContext.Provider value={memoizedValue}>
      {initModal && (
        <Banner {...content} onClose={() => hideBanner()} open={isVisible}>
          {content?.children}
        </Banner>
      )}
      {children}
    </BannerContext.Provider>
  )
}

export default BannerProvider
