import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ to, text }) => {
  return (
    <Link to={`${to}`} className={styles.button} style={{backgroundImage: `url(./assets/img/arrow.svg)`}}>
      {text}
    </Link>
  );
};

Button.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
