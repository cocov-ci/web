'use client'

import classNames from 'classnames'
import { LucideIcon } from 'lucide-react'
import React, { ChangeEventHandler, useRef, useState } from 'react'

import Loading from '../Loading'

import styles from './Textarea.module.scss'

interface TextareaProps {
  icon?: LucideIcon
  className?: string
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  errored?: boolean
  label?: string
  width?: string
  labelWidth?: string
  loading?: boolean
  resize?: boolean
  variation?: 'light' | 'dark'
  autoFocus?: boolean
  innerRef?: React.MutableRefObject<HTMLTextAreaElement | null>
  inputClassName?: string
}

const Textarea = ({
  className,
  value,
  disabled,
  placeholder,
  onChange,
  errored,
  label,
  loading,
  width = '100%',
  variation = 'light',
  onKeyUp,
  onKeyDown,
  autoFocus,
  icon: Icon,
  innerRef,
  labelWidth,
  height,
  resize,
  inputClassName,
}: TextareaProps & React.HTMLProps<HTMLTextAreaElement>) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [focused, setFocused] = useState(false)

  const updateFocusState = () => {
    if (textareaRef.current && document.activeElement !== null) {
      setFocused(document.activeElement === textareaRef.current)
    }
  }

  const captureFocus = () => textareaRef.current && textareaRef.current.focus()

  return (
    <div
      className={classNames(styles.base, {
        [styles.light]: variation == 'light',
        [styles.dark]: variation == 'dark',
      })}
      style={{ width, height }}
    >
      {label && (
        <label
          className={classNames(styles.label, {
            [styles.labelDisabled]: disabled === true,
          })}
          onClick={captureFocus}
          style={{ width: labelWidth || 'auto' }}
        >
          {label}
        </label>
      )}
      <div
        className={classNames(styles.textareaWrapper, className, {
          [styles.focused]: focused,
          [styles.errored]: errored,
          [styles.disabled]: disabled === true,
        })}
      >
        {Icon && (
          <div className={styles.iconContainer}>
            <Icon onClick={captureFocus} size={18} />
          </div>
        )}
        <textarea
          autoFocus={autoFocus}
          className={classNames(styles.textarea, inputClassName, {
            [styles.withIcon]: !!Icon,
            [styles.withSpinner]: !!loading,
            [styles.resize]: resize,
          })}
          disabled={disabled === true}
          onBlur={updateFocusState}
          onChange={onChange}
          onFocus={updateFocusState}
          onKeyDown={e => onKeyDown && onKeyDown(e)}
          onKeyUp={e => onKeyUp && onKeyUp(e)}
          placeholder={placeholder}
          ref={node => {
            textareaRef.current = node

            if (innerRef) {
              innerRef.current = node
            }
          }}
          value={value}
        />
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={classNames(styles.loadingWrapper, {
            [styles.loadingVisible]: loading,
          })}
          onClick={captureFocus}
        >
          <Loading size={15} tiny={true} type="spinner" variation={variation} />
        </div>
      </div>
    </div>
  )
}

export default Textarea
