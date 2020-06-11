import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import styles from './Button.module.css';
// './assets/img/ancestor_george.png'
// style={{ backgroundImage: `url(img/assets/arrow.svg)`}}
const Button = ({ link, text }) => {
  return (
    <Link to={`${link}`} className={styles.button} style={{backgroundImage: `url(./assets/img/arrow.svg)`}}>
      {text}
    </Link>
  );
};

export default Button;
