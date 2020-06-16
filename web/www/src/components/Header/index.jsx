import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import styles from './Header.module.css';
import { useObserver } from 'mobx-react-lite';
import Sidebar from '../Sidebar/index.jsx';

const Header = ({logo, menu, content, text, toggleDashboard}) => {
    const [menuToggle, setMenu] = useState(false);

    const LogoView = () => {
        if (logo) {
            return (
              <img
                className={styles.logo}
                src="./assets/img/FYFR.svg"
                alt="logo"
                width="37"
                height="39"
              />
            );
        } else {
            return '';
        }
    }

    const MenuView = () => {
        if (menu) {
            return (
                <button onClick={(e) => setMenu(true)}>
                    <img
                    className={styles.img}
                    src="./assets/img/hamburger.svg"
                    alt="group img"
                    width="24"
                    height="12"
                    />
                </button>
            )
        } else {
            return '';
        }
    }

  const TextView = () => {
    if (content && text)  {
      return (
        <p className={styles.text}>{text}</p>
      )
    } else if (content && toggleDashboard){
      return (
        <div className={styles.dashboard__views}>
          <NavLink
            to={`${ROUTES.ancestors}`}
            className={styles.tab}
            activeClassName={styles.tabActive}
          >
            Family Tree
            </NavLink>
          <NavLink
            to={`${ROUTES.map}`}
            className={styles.tab}
            activeClassName={styles.tabActive}
          >
            Roots DNA
            </NavLink>
        </div>
      );
    }
  }

    // const SidebarView = () => {
    //     if (menu) {
    //         return <Sidebar type={'menu'} toggle={menuToggle} setToggle={setMenu}/>;
    //     } else {
    //         return '';
    //     }
    // }

  return useObserver(() => (
    <>
      <div className={styles.header}>
        <LogoView />
        <TextView />
        <MenuView />
      </div>
      {/* <SidebarView /> */}
      <Sidebar type={'menu'} toggle={menuToggle} setToggle={setMenu} />
    </>
  ));
};

export default Header;
