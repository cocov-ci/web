import classNames from 'classnames'
import Link from 'next/link'
import React, { HTMLAttributeAnchorTarget } from 'react'

import styles from './Histogram.module.scss'

type HistogramItem = {
  label: string
  value: number
  href?: string
  hrefTarget?: HTMLAttributeAnchorTarget
}

type HistogramProps = {
  className?: string
  values: Array<HistogramItem>
}

const Histogram = ({ className, values }: HistogramProps) => {
  const maxValue = Math.max(0.01, ...values.map(i => i.value))

  const autoWrap = (el: HistogramItem, children: JSX.Element) => {
    if (el.href) {
      return (
        <Link href={el.href} key={`label-${el.label}`} target={el.hrefTarget}>
          {children}
        </Link>
      )
    }

    return children
  }

  return (
    <div className={classNames(styles.base, className)}>
      <div className={styles.labels}>
        {values.map(obj =>
          autoWrap(
            obj,
            <div className={styles.label} key={`label-${obj.label}`}>
              <div className={styles.labelWrapper}>{obj.label}</div>
            </div>,
          ),
        )}
      </div>
      <div className={styles.values}>
        {values.map(obj =>
          autoWrap(
            obj,
            <div className={styles.value} key={`value-${obj.label}`}>
              <div
                className={styles.valueWrapper}
                style={{
                  width: `${(obj.value / maxValue) * 95}%`,
                }}
              >
                {obj.value}
              </div>
            </div>,
          ),
        )}
      </div>
    </div>
  )
}

export default Histogram
