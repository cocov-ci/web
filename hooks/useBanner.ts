import { useContext } from 'react'

import { BannerContext } from 'context/BannerContext'

const useBanner = () => useContext(BannerContext)

export default useBanner
