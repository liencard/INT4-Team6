import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ to, text }) => {
  return (
    <Link to={`${to}`} className={styles.button} style={{backgroundImage: `url(./assets/img/arrow.svg)`}}>
      {text}
    </Link>
  );
};

export default Button;