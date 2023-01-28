'use client'

import classNames from 'classnames'
import { LucideIcon } from 'lucide-react'
import React, { ChangeEventHandler, useRef, useState } from 'react'

import Loading from '../Loading'

import styles from './Input.module.scss'

interface InputProps {
  icon?: LucideIcon
  className?: string
  value?: string
  disabled?: boolean
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  errored?: boolean
  type: React.HTMLInputTypeAttribute
  label?: string
  width?: string
  loading?: boolean
  variation?: 'light' | 'dark'
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  innerRef?: React.MutableRefObject<HTMLInputElement | null>
}

const Input = ({
  className,
  value,
  disabled,
  placeholder,
  onChange,
  errored,
  type,
  label,
  loading,
  width = '100%',
  variation = 'light',
  onKeyUp,
  onKeyDown,
  autoFocus,
  icon: Icon,
  innerRef,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [focused, setFocused] = useState(false)

  const updateFocusState = () => {
    if (inputRef.current && document.activeElement !== null) {
      setFocused(document.activeElement === inputRef.current)
    }
  }

  const captureFocus = () => inputRef.current && inputRef.current.focus()

  return (
    <div
      className={classNames(styles.base, {
        [styles.light]: variation == 'light',
        [styles.dark]: variation == 'dark',
      })}
      style={{ width }}
    >
      {label && (
        <label
          className={classNames(styles.label, {
            [styles.labelDisabled]: disabled === true,
          })}
          onClick={captureFocus}
        >
          {label}
        </label>
      )}
      <div
        className={classNames(styles.inputWrapper, className, {
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
        <input
          autoFocus={autoFocus}
          className={classNames(styles.input, {
            [styles.withIcon]: !!Icon,
            [styles.withSpinner]: !!loading,
          })}
          disabled={disabled === true}
          onBlur={updateFocusState}
          onChange={onChange}
          onFocus={updateFocusState}
          onKeyDown={e => onKeyDown && onKeyDown(e)}
          onKeyUp={e => onKeyUp && onKeyUp(e)}
          placeholder={placeholder}
          ref={node => {
            inputRef.current = node

            if (innerRef) {
              innerRef.current = node
            }
          }}
          type={type}
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

export default Input
