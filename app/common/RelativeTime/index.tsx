import classNames from 'classnames'
import React from 'react'

interface RelativeTimeProps {
  className?: string
  timestamp: Date
}

const getFormattedTitle = (date: Date): string | undefined => {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

interface IntervalData {
  ge: number
  divisor: number
  unit?: Intl.RelativeTimeFormatUnit
  text?: string
}

class BodyFormatter {
  static FORMATTER = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  static SECOND = 1000
  static MINUTE = 60 * this.SECOND
  static HOUR = 60 * this.MINUTE
  static DAY = 24 * this.HOUR
  static WEEK = 7 * this.DAY
  static MONTH = 30 * this.DAY
  static YEAR = 365 * this.DAY
  static INTERVALS: Array<IntervalData> = [
    { ge: this.YEAR, divisor: this.YEAR, unit: 'year' },
    { ge: this.MONTH, divisor: this.MONTH, unit: 'month' },
    { ge: this.WEEK, divisor: this.WEEK, unit: 'week' },
    { ge: this.DAY, divisor: this.DAY, unit: 'day' },
    { ge: this.HOUR, divisor: this.HOUR, unit: 'hour' },
    { ge: this.MINUTE, divisor: this.MINUTE, unit: 'minute' },
    { ge: 30 * this.SECOND, divisor: this.SECOND, unit: 'seconds' },
    { ge: 0, divisor: 1, text: 'just now' },
  ]

  static getFormattedBody(date: Date): string | undefined {
    const now = new Date(Date.now()).getTime()
    const diff =
      now - (typeof date === 'object' ? date : new Date(date)).getTime()
    const diffAbs = Math.abs(diff)

    for (const interval of this.INTERVALS) {
      if (diffAbs >= interval.ge) {
        const x = Math.round(Math.abs(diff) / interval.divisor)
        const isFuture = diff < 0

        return interval.unit
          ? this.FORMATTER.format(isFuture ? x : -x, interval.unit)
          : interval.text
      }
    }
  }
}

const RelativeTime = ({ className, timestamp }: RelativeTimeProps) => {
  return (
    <span
      className={classNames(className)}
      title={getFormattedTitle(timestamp)}
    >
      {BodyFormatter.getFormattedBody(timestamp)}
    </span>
  )
}

export default RelativeTime
