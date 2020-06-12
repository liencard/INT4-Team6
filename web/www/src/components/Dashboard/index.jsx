import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import styles from './Dashboard.module.css';


/* misschien is header eigenlijk een logischere naam voor deze component? */
const Dashboard = () => {
  return (
    <>
      <div className={styles.container}>
        {/* Header dashboard */}
        <div className={styles.dashboard__header}>
          <img className={styles.img} src='./assets/img/FYFR.svg' alt="group img" width="37" height="39"/>
          <div className="dashboard__views">
            <NavLink to={`${ROUTES.ancestors}`} className={styles.tab} activeClassName={styles.tabActive}>
              Family Tree
            </NavLink>
            <NavLink to={`${ROUTES.map}`}className={styles.tab} activeClassName={styles.tabActive}>
              Roots DNA
            </NavLink>
          </div>
          <img className={styles.img} src='./assets/img/hamburger.svg' alt="group img" width="24" height="12" />
        </div>

      </div>

    </>
  );
};

export default Dashboard;
