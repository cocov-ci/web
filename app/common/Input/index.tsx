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
  icon: Icon,
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
    <div className={styles.base} style={{ width }}>
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
          className={classNames(styles.input, {
            [styles.withIcon]: !!Icon,
            [styles.withSpinner]: !!loading,
          })}
          disabled={disabled === true}
          onBlur={updateFocusState}
          onChange={onChange}
          onFocus={updateFocusState}
          placeholder={placeholder}
          ref={inputRef}
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
          <Loading size={15} tiny={true} type="spinner" />
        </div>
      </div>
    </div>
  )
}

export default Input
