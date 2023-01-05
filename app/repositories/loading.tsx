import LoadingToolbar from 'app/common/TopBar/Loading'
import LoadingRepository from 'app/repositories/Repository/Loading'

const LoadingPage = () => {
  return (
    <>
      <LoadingToolbar />
      <LoadingRepository />
      <LoadingRepository />
      <LoadingRepository />
      <LoadingRepository />
    </>
  )
}

export default LoadingPage
