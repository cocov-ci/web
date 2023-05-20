import classNames from "classnames";
import { Key, Trash } from "lucide-react";
import React from 'react'
import AccessoryButton from "../../../common/AccessoryButton";
import Button from "../../../common/Button";
import styles from './Item.module.scss'

interface ItemProps {
  description: string
  created_at: string
  created_by: string
  last_used_at?: string
}

const Item = ({ description, created_at, created_by, last_used_at }: ItemProps) => {
  return (
    <div className={styles.base}>
      <div className={styles.iconWrapper}>
        <Key size={13} />
      </div>
      <div className={styles.InfoWrapper}>
        <div className={classNames(styles.title, {
          [styles.active]: !!last_used_at
        })}>{ description }</div>
      </div>
      <div className={styles.ButtonWrapper}>
        <AccessoryButton kind="squared"><Trash size={17} /></AccessoryButton>
      </div>
    </div>
  )
}

export default Item
