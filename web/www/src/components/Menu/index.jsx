import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';
import NavBar from '../NavBar/index.jsx';
import { ROUTES } from '../../consts';

const Menu = () => {

  const STATE_LOADING = 'loading';
  const STATE_LOADED = 'loaded';
  const STATE_NOT_FOUND = "notFound";

  const store = useStore();
  const { uiStore  } = store;

  const [currentUser, setCurrentUser] = useState(uiStore.currentUser);
  const [state, setState] = useState(STATE_LOADING);

  useEffect(() => {

    const loadCurrentUser = async () => {
      try {
        if (currentUser) {
          setState(STATE_LOADED);
          return;
        }
        await store.userStore.loadAllUsers();
        store.uiStore.setCurrentUser(
          store.userStore.resolveUser('4e8baf11-bb77-3f6b-97d1-69b8e51c2ebe')
        );

        setCurrentUser(store.uiStore.currentUser);
        setState(STATE_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_NOT_FOUND);
        }
      }
    }

    loadCurrentUser();
    
  }, [store, setCurrentUser, currentUser])

  return useObserver(() => {
    if (state === STATE_LOADING) {
      return (
        <>
          <div className={styles.menu__wrapper}>
            <div>
              <img
                className={styles.image}
                src="/assets/img/ancestors/thumbnail/AliceBaker.jpg"
                alt=""
                height="140"
                width="140"
              />
              <h2 className={styles.name}>Loading user</h2>
            </div>

            <NavBar />

            <Link to={ROUTES.home} className={styles.button}>
              Log out
            </Link>
          </div>
        </>
      );
    }
    return (
      <>
        <div className={styles.menu__wrapper}>
          <div>
            <img
              className={styles.image}
              src={uiStore.currentUser.avatar}
              alt=""
              height="140"
              width="140"
            />
            <h2 className={styles.name}>{currentUser.name}</h2>
          </div>

          <NavBar />

          <Link to={ROUTES.home} className={styles.button}>
            Log out
          </Link>
        </div>
      </>
    );
  });
};

export default Menu;
