 import React, { useState } from 'react';
 import styles from './Bookmarks.module.css';
 import { useObserver } from 'mobx-react-lite';
 import Sidebar from '../Sidebar/index.jsx';


 const Bookmarks = () => {

    const [menu, setMenu] = useState(false);

    const handleClickMenu = (e) => {
      e.stopPropagation();
      setMenu(true);
    };
   
   return useObserver(() => (
     <>
        <Sidebar type={'menu'} toggle={menu} setToggle={setMenu} />
        <div className={styles.container}>
            <div className={styles.dashboard__header}>
                <img
                    className={styles.img}
                    src="./assets/img/FYFR.svg"
                    alt="group img"
                    width="37"
                    height="39"
                />
                <div className={styles.header__title}>
                    <p>Bookmarked Ancestors</p>
                </div>
                <button onClick={(e) => handleClickMenu(e)}>
                    <img
                    className={styles.img}
                    src="./assets/img/hamburger.svg"
                    alt="group img"
                    width="24"
                    height="12"
                    />
                </button>
            </div>
       </div>
     </>
   ));
 };

 export default Bookmarks;
