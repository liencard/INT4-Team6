 import React, { useState } from 'react';
 import styles from './Bookmarks.module.css';
 import { useObserver } from 'mobx-react-lite';
 import { useStore } from '../../hooks/useStore';
 import Sidebar from '../Sidebar/index.jsx';


 const Bookmarks = () => {
    const { bookmarkStore } = useStore();
    const [menu, setMenu] = useState(false);

    const handleClickMenu = (e) => {
      e.stopPropagation();
      setMenu(true);
    }; 
   
   return useObserver(() => (
     <>
       <Sidebar type={'menu'} toggle={menu} setToggle={setMenu} />
       <div className={styles.container}>
         <div className={styles.header}>
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

         <section className={styles.bookmarks}>
           <h2 className={styles.hidden}>Bookmarked</h2>
           <p className={styles.title}>Stories you've saved that are worth the read.</p>
           <div className={styles.bookmarks__wrapper}>
             <article className={styles.bookmark}>
                <div className={styles.bookmark__info}>
                    <h3 className={styles.bookmark__name}>Ethan Cole</h3>
                    <p className={styles.bookmark__date}>1914 - 1879</p>
                </div>
                <img
                  className={styles.bookmark__img}
                  src="./assets/img/ancestors/thumbnail/GeorgeCole.jpg"
                  alt="ancestor"
                  width="300"
                  height="300"
                />
             </article>
           </div>
         </section>
       </div>
     </>
   ));
 };

 export default Bookmarks;
