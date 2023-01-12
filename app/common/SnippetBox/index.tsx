'use client'

import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

import AccessoryButton, {
  CheckIcon,
  CopyIcon,
} from 'app/common/AccessoryButton'
import { inconsolata } from 'utils/fonts'

import styles from './SnippetBox.module.scss'

type SnippetBoxProps = {
  className?: string
  source: string
  multiline?: boolean
}

const SnippetBox = ({ className, source, multiline }: SnippetBoxProps) => {
  const autoSelect = (
    ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    ev.target.select()
  }

  const [showingCheck, setShowingCheck] = useState<boolean>(false)
  const [checkTimer, setCheckTimer] = useState<null | NodeJS.Timeout>(null)
  useEffect(() => {
    if (!checkTimer && showingCheck) {
      const timer = setTimeout(() => setShowingCheck(false), 2000)
      setCheckTimer(timer)
    } else if (checkTimer && !showingCheck) {
      clearTimeout(checkTimer)
      setCheckTimer(null)
    }

    return () => {
      if (checkTimer) {
        clearTimeout(checkTimer)
        setCheckTimer(null)
      }
    }
  }, [showingCheck])

  const doCopy = () => {
    if (!window.navigator) {
      return
    }

    window.navigator.clipboard
      .writeText(source)
      .then(() => setShowingCheck(true))
  }

  return (
    <div
      className={classNames(styles.base, className, {
        [styles.multiline]: multiline === true,
      })}
    >
      {multiline === true ? (
        <textarea
          className={classNames(styles.multilineInput, inconsolata.className)}
          onFocus={autoSelect}
          readOnly={true}
          value={source}
        />
      ) : (
        <input
          className={classNames(styles.singleLineInput, inconsolata.className)}
          onFocus={autoSelect}
          readOnly={true}
          type="text"
          value={source}
        />
      )}
      <AccessoryButton
        className={styles.copyButton}
        kind="squared"
        onClick={() => doCopy()}
        title="Copy"
      >
        <div
          className={classNames(styles.iconWrapper, {
            [styles.moveUp]: showingCheck,
          })}
        >
          <CopyIcon />
        </div>
        <div
          className={classNames(styles.iconWrapper, styles.check, {
            [styles.moveUp]: showingCheck,
          })}
        >
          <CheckIcon />
        </div>
      </AccessoryButton>
    </div>
  )
}

export default SnippetBox
