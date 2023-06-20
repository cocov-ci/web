import { useContext } from 'react'

import { BannerContext, ShowBannerProps } from 'context/BannerContext'

const useBanner = () => {
  return useContext(BannerContext)
}

export const useErrorBanner = () => {
  const { showBanner } = useContext(BannerContext)

  const showErrorBanner = (props: ShowBannerProps) => {
    showBanner({
      variation: 'warning',
      ...props,
    })
  }

  return { showBanner: showErrorBanner }
}

export default useBanner
