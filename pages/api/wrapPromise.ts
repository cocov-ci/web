type StatusProps = 'pending' | 'error' | 'success'

function wrapPromise<T>(promise: Promise<T>): () => T {
  let status: StatusProps = 'pending'
  let response: T

  const suspender = promise.then(
    res => {
      status = 'success'
      response = res
    },
    err => {
      status = 'error'
      response = err
    },
  )

  const handler = {
    pending: () => {
      throw suspender
    },
    error: () => {
      throw response
    },
    success: () => response,
    default: () => response,
  }

  const read = () => {
    return handler[status] ? handler[status]() : handler.default()
  }

  return read
}

export default wrapPromise
