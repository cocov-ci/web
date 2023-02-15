import React from 'react'

import Loading from 'app/common/Loading'

const LoadingComponent = () => {
  return (
    <>
      {Array.from(Array(3).keys()).map(item => (
        <div key={item} style={{ marginBottom: '10px' }}>
          <Loading height="73px" type="skeleton" width="100%" />
        </div>
      ))}
    </>
  )
}

export default LoadingComponent
