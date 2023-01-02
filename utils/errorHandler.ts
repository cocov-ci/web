import { redirect } from 'next/navigation'

const errorHandler = async (code: string) => {
  switch (code) {
    case 'auth.invalid_token':
      redirect('/auth/signin?invalid_token=true')
      break
    default:
  }

  return Promise.resolve()
}

export default errorHandler
