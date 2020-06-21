import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../consts';
import styles from './NavBar.module.css';


const NavBar = () => {

    return useObserver(() => (
        <>
            <div className={styles.menu__nav}>
                <NavLink
                    to={`${ROUTES.ancestors}`}
                    className={styles.nav}
                    activeClassName={styles.tabActive}
                >
                    Family Tree
                </NavLink>
                <NavLink
                    to={`${ROUTES.map}`}
                    className={styles.nav}
                    activeClassName={styles.tabActive}
                >
                    DNA Roots
                </NavLink>
                <NavLink
                    to={'link'}
                    className={styles.nav}
                    activeClassName={styles.tabActive}
                >
                    Link 2
                </NavLink>
                <NavLink
                    to={`${ROUTES.bookmarks}`}
                    className={styles.nav}
                    activeClassName={styles.tabActive}
                > 
                    Bookmarks
                </NavLink>
                <NavLink
                    to={'settings'}
                    className={styles.nav}
                    activeClassName={styles.tabActive}
                >
                    Settings
                </NavLink>
            </div>
        </>
    ));
};

export default NavBar;
