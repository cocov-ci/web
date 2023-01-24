const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short' })
    .format(new Date(date))
    .split(' ')
    .reverse()
    .join('/')
}

export const getLabels = (data: { [any: string]: number | null }) =>
  Object.keys(data).map(key => formatDate(key))

export const getData = (data: { [any: string]: number | null }) =>
  Object.values(data).map(item => Number(item))
