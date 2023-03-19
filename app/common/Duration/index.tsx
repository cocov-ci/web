import classNames from 'classnames'
import React from 'react'

interface DurationProps {
  fromDate: string
  toDate?: string
  className?: string
}

const pluralize = (quantity: number, singular: string) =>
  `${quantity} ${singular}${quantity > 1 ? 's' : ''}`

const Duration = ({ className, fromDate, toDate }: DurationProps) => {
  const parsedFrom = Date.parse(fromDate)
  let parsedTo: number

  if (toDate) {
    parsedTo = Date.parse(toDate)
  } else {
    parsedTo = Date.now()
  }

  const duration = Math.abs(parsedTo - parsedFrom) / 1000.0
  const hours = ~~(duration / 3600)
  const minutes = ~~((duration % 3600) / 60)
  const seconds = ~~duration % 60
  const components = []

  if (hours > 0) {
    components.push(pluralize(hours, 'hour'))
  }

  if (minutes > 0) {
    components.push(pluralize(minutes, 'minute'))
  }

  if (seconds > 0) {
    components.push(pluralize(seconds, 'second'))
  }

  if (hours + minutes + seconds === 0) {
    components.push('less than a second')
  }

  let result

  if (components.length > 1) {
    const last = components.pop()
    result = `${components.join(', ')} and ${last}`
  } else {
    result = `${components.pop()}`
  }

  return <span className={classNames(className)}>{result}</span>
}

export default Duration
