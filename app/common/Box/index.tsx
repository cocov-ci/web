import classNames from 'classnames';
import React from 'react';
import styles from './Box.module.scss';

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className }: BoxProps) => {
  return <div className={classNames(styles.box, className)}>{children}</div>;
};

export default Box;
