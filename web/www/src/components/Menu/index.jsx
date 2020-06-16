import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import styles from './Menu.module.css';
import Button from '../Button/index.jsx';
import NavBar from '../NavBar/index.jsx';

const Menu = () => {

  const STATE_LOADING = 'loading';
  const STATE_LOADED = 'loaded';
  const STATE_NOT_FOUND = "notFound";

  const { uiStore } = useStore();

  const [currentUser, setCurrentUser] = useState(uiStore.currentUser);
  const [state, setState] = useState(STATE_LOADING);

  useEffect(() => {

    const loadCurrentUser = async () => {
      try {
        const currentUser = await uiStore.currentUser;
        if (!currentUser) {
          setState(STATE_LOADING);
          return;
        }
        setCurrentUser(currentUser);
        setState(STATE_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_NOT_FOUND);
        }
      }
    }

    loadCurrentUser();
    
  }, [uiStore, setCurrentUser])

  return useObserver(() => {
    if (state === STATE_LOADING) {
      return (
        <>
          <div className={styles.menu__wrapper}>
            <img
              className={styles.image}
              src="./assets/img/ancestors/tumbnail/AliceBaker.jpg"
              alt=""
              height="140"
              width="140"
            />
            <h2 className={styles.name}>Loading user</h2>

            <NavBar/>
          </div>
          <Button text={'logout'} to={'link'} />
        </>
      )
    }
    return (
    <>
      <div className={styles.menu__wrapper}>
        <img
          className={styles.image}
          src={uiStore.currentUser.avatar}
          alt=""
          height="140"
          width="140"
        />
        <h2 className={styles.name}>{currentUser.name}</h2>

        <NavBar />
      </div>
      <Button text={'logout'} to={'link'} />
    </>
    )
  });
};

export default Menu;
