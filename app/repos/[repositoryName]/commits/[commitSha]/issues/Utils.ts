import { isEmpty, isNil, omitBy } from 'lodash'

export const getUpdatedUrl = ({
  searchParams,
  pathname,
  param,
}: {
  searchParams: URLSearchParams
  pathname: string
  param: { [arg: string]: string | null }
}): string => {
  const category = searchParams.get('category')
  const source = searchParams.get('source')

  const validParams = omitBy(
    { source: source, category: category, ...param },
    isNil,
  )

  const params =
    !isEmpty(validParams) &&
    new URLSearchParams(validParams as Record<string, string>).toString()

  return params ? `${pathname}?${params}` : pathname
}
