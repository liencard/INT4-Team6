import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import styles from './Header.module.css';
import { useObserver } from 'mobx-react-lite';
import Sidebar from '../Sidebar/index.jsx';

const Header = ({logo, menu, content, text, toggleDashboard, togglePartners, to}) => {
    const [menuToggle, setMenu] = useState(false);

    const [visible, setVisibility] = useState(true);
    const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);

      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;
        setPrevScrollpos(currentScrollPos);
        setVisibility(visible);
      };

    window.addEventListener('scroll', handleScroll);

    const LogoView = () => {
        if (logo) {
            return (
              <Link to={ROUTES.ancestors}>
                <img
                  className={styles.logo}
                  src="/assets/img/AVOS.svg"
                  alt="logo"
                  width="37"
                  height="39"
                />
              </Link>
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
                    className={styles.hamburger}
                    src="/assets/img/hamburger.svg"
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
    } else if (content && toggleDashboard) {
      return (
        <div>
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
    } else if (content && togglePartners) { 
        return (
          <div className={`${ visible ? styles.toggle__visible : styles.toggle__hidden}`}>
            <div className={styles.partners__wrapper}>
              <p className={styles.text}>Toggle between partners</p>
              <div className={styles.toggle}>
                <NavLink
                  to={`${to.woman}`}
                  className={styles.tab}
                  activeClassName={styles.tabActive}
                >
                  <svg
                    width="10"
                    height="15"
                    viewBox="0 0 10 15"
                    fill="none"
                    className={styles.toggle__icon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="5" cy="5" r="4.5" stroke="#A0A0A0" />
                    <path d="M5 15L5 9" stroke="#A0A0A0" />
                    <path d="M3 13L7 13" stroke="#A0A0A0" />
                  </svg>
                  {content.woman}
                </NavLink>
                <NavLink
                  to={`${to.man}`}
                  className={styles.tab}
                  activeClassName={styles.tabActive}
                >
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    className={styles.toggle__icon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="4.89517"
                      cy="10.4582"
                      r="4.39517"
                      stroke="#A0A0A0"
                    />
                    <path
                      d="M7.16585 6.54216L10.3047 3.40332"
                      stroke="#A0A0A0"
                    />
                    <path
                      d="M10.6534 5.74988L10.6534 3.05717L7.8336 3.05654"
                      stroke="#A0A0A0"
                    />
                  </svg>
                  {content.man}
                </NavLink>
              </div>
            </div>
          </div>
        );
    } else {
         return '';
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
