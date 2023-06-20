'use client'

import React, { createContext, useEffect, useMemo, useState } from 'react'

import Banner, { BannerProps } from 'app/common/Banner'

export type ShowBannerProps = BannerProps & { autoClose?: boolean }

interface BannerPropsContext {
  showBanner: (arg: ShowBannerProps) => void
}
interface BannerProviderProps {
  children: React.ReactNode
}

export const BannerContext = createContext<BannerPropsContext>({
  showBanner: () => null,
})

const BannerProvider = ({ children }: BannerProviderProps) => {
  const [initModal, setInitModal] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [content, setContent] = useState<ShowBannerProps>()
  let timer: ReturnType<typeof setTimeout>

  const showBanner = (content: ShowBannerProps) => {
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

  useEffect(() => {
    if (content?.autoClose) {
      clearTimeout(timer)
      timer = setTimeout(() => hideBanner(), 6000)
    }
  }, [content])

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
