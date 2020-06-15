import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import styles from './Dashboard.module.css';
import { useObserver } from 'mobx-react-lite';
import Sidebar from '../Sidebar/index.jsx';

/* misschien is header eigenlijk een logischere naam voor deze component? */
/* => uiteindelijk komt de info icone en share functie hier ook in niet?*/

const Dashboard = () => {
    const [menu, setMenu] = useState(false);

    const handleClickMenu = (e) => {
    e.stopPropagation();
    setMenu(true);
  };

  return useObserver(() => (
    <>
      <Sidebar type={"menu"} toggle={menu} setToggle={setMenu} />
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
          <button onClick={(e) => handleClickMenu(e)}>
            <img className={styles.img} src='./assets/img/hamburger.svg' alt="group img" width="24" height="12" />
          </button>
        </div>

        <div className={styles.dashboard__footer}>
          <img className={styles.img} src='./assets/img/icon_info.svg' alt="info icon" width="27" height="27" />

          <div className={styles.footer__share}>
            <span className={styles.share__text}>share</span>
            <img className={styles.img} src='./assets/img/icon_share.svg' alt="share icon" width="24" height="24" />
          </div>
        </div>

        
      </div>

    </>
  ));
};

export default Dashboard;
