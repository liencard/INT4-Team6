import React, { useState } from 'react';
import styles from './Bookmarks.module.css';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import Sidebar from '../Sidebar/index.jsx';
import Bookmark from '../Bookmark/index.jsx';


 const Bookmarks = () => {
    const { bookmarkStore } = useStore();
    const [menu, setMenu] = useState(false);

    const handleClickMenu = (e) => {
      e.stopPropagation();
      setMenu(true);
    }; 
   
    console.log(bookmarkStore.bookmarks);

   return useObserver(() => (
     <>
       <Sidebar type={'menu'} toggle={menu} setToggle={setMenu} />

       <div
         className={styles.container}
         style={{ backgroundImage: `url(assets/img/bookmark_bg.png)` }}
       >
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
           <p className={styles.title}>
             Stories you've saved that are worth the read.
           </p>
           <div className={styles.bookmarks__wrapper}>
             {bookmarkStore.bookmarks.map((bookmark) => (
               <group key={bookmark.id} bookmarkId={bookmark.id}>
                 <Bookmark bookmark={bookmark} />
               </group>
             ))}
             <Link to={`${ROUTES.ancestors}`} className={styles.btn}>
               <div className={styles.bookmarks__btn}>
                 <img
                   className={styles.img}
                   src="./assets/img/icon_bookmark.svg"
                   alt="bookmark icon"
                   width="122"
                   height="122"
                 />
                 <p className={styles.btn__text}>add other ancestors</p>
               </div>
             </Link>
           </div>
         </section>
       </div>
     </>
   ));
 };

 export default Bookmarks;
