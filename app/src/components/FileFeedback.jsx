import React from 'react';
import styles from './FileFeedback.module.scss';

const FileFeedback = ({ children, type }) => {
  return <div className={styles[`${type}-feedback`]}>{children}</div>;
};

export default FileFeedback;
