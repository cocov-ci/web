import { redirect } from 'next/navigation'

const errorHandler = (code: string) => {
  switch (code) {
    case 'auth.invalid_token':
      redirect('/auth/signin?invalid_token=true')
      break
    default:
  }
}

export default errorHandler
