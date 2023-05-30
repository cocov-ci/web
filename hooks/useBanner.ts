import { useContext } from 'react'

import { BannerContext, ShowBannerProps } from 'context/BannerContext'

const useBanner = () => {
  return useContext(BannerContext)
}

export const useErrorBanner = () => {
  const { showBanner } = useContext(BannerContext)

  const showErrorBanner = ({ children }: ShowBannerProps) => {
    showBanner({
      autoClose: true,
      children: children,
      variation: 'warning',
    })
  }

  return { showBanner: showErrorBanner }
}

export default useBanner
