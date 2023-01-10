import classNames from 'classnames'
import { LucideIcon } from 'lucide-react'
import React, { ChangeEventHandler, useRef } from 'react'

import Loading from '../Loading'

import styles from './Input.module.scss'

interface InputProps {
  icon?: LucideIcon
  className?: string
  value?: string
  disabled?: boolean
  placeholder?: string
  onChange?: ChangeEventHandler
  errored?: boolean
  type?: string
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

  return (
    <div className={styles.base} style={{ width }}>
      {label && (
        <label
          className={classNames(styles.label, className, {
            [styles.labelDisabled]: disabled === true,
          })}
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          {label}
        </label>
      )}
      {Icon && (
        <div className={styles.iconContainer}>
          <Icon size={18} />
        </div>
      )}
      <input
        className={classNames(styles.input, className, {
          [styles.errored]: errored,
          [styles.withIcon]: !!Icon,
          [styles.withSpinner]: !!loading,
        })}
        disabled={disabled === true}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
        type={type}
        value={value}
      />
      {loading && (
        <div className={classNames(styles.loading)}>
          <Loading size={20} tiny={true} type="spinner" />
        </div>
      )}
    </div>
  )
}

export default Input
