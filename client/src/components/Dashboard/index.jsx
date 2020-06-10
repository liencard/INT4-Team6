import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import styles from './Dashboard.module.css';


const Dashboard = () => {
  return (
    <>
        <li className={styles.color}>
        <Link to={`${ROUTES.ancestors}`}>
            Ancestors
        </Link>
        </li>
        <li className={styles.color}>
        <Link to={`${ROUTES.map}`}>
            Map
        </Link>
        </li>
    </>
  );
};

export default Dashboard;
