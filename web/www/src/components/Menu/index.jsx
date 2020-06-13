import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Menu.module.css';
import Button from '../Button/index.jsx';

const Menu = () => {
  return useObserver(() => (
    <>
      <div className={styles.menu__wrapper}>
        <h2>Ethan Cole</h2>
        <p>test</p>
      </div>
      <Button text={'read story'} to={'link'} />
    </>
  ));
};

export default Menu;
