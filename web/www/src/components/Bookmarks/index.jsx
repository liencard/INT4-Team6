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
             <Link
               to={`${ROUTES.ancestors}`}
               className={styles.btn}
             >
               <div className={styles.bookmarks__btn}>
                 <svg
                   width="122"
                   height="122"
                   viewBox="0 0 122 122"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <circle cx="61" cy="61" r="60.5" stroke="#A0A0A0" />
                   <circle
                     cx="38.2768"
                     cy="52.6277"
                     r="13.8529"
                     stroke="#A0A0A0"
                   />
                   <path
                     d="M88.5107 28.7061H89.0107C89.0107 28.4299 88.7868 28.2061 88.5107 28.2061V28.7061ZM88.5107 93.2943L88.1997 93.6859C88.35 93.8052 88.5553 93.828 88.7281 93.7446C88.9009 93.6611 89.0107 93.4862 89.0107 93.2943H88.5107ZM38.2754 28.7061V28.2061C37.9992 28.2061 37.7754 28.4299 37.7754 28.7061H38.2754ZM38.2754 34.0013H37.7754C37.7754 34.135 37.8289 34.2631 37.924 34.357C38.019 34.4509 38.1477 34.5029 38.2814 34.5013L38.2754 34.0013ZM38.2754 70.9987L38.2813 70.4987C38.1477 70.4971 38.019 70.5491 37.9239 70.643C37.8289 70.7369 37.7754 70.865 37.7754 70.9987H38.2754ZM38.2754 93.2943H37.7754C37.7754 93.4862 37.8852 93.6611 38.058 93.7446C38.2308 93.828 38.4361 93.8052 38.5863 93.6859L38.2754 93.2943ZM63.393 73.3479L63.704 72.9564C63.5219 72.8118 63.2642 72.8118 63.0821 72.9564L63.393 73.3479ZM88.0107 28.7061V93.2943H89.0107V28.7061H88.0107ZM38.2754 29.2061H88.5107V28.2061H38.2754V29.2061ZM38.7754 33.4904V28.7061H37.7754V33.4904H38.7754ZM38.7754 34.0013V33.4904H37.7754V34.0013H38.7754ZM38.2814 34.5013C38.3543 34.5004 38.4273 34.5 38.5005 34.5V33.5C38.4234 33.5 38.3463 33.5005 38.2694 33.5014L38.2814 34.5013ZM38.5005 34.5C48.4416 34.5 56.5005 42.5589 56.5005 52.5H57.5005C57.5005 42.0066 48.9939 33.5 38.5005 33.5V34.5ZM56.5005 52.5C56.5005 62.4411 48.4416 70.5 38.5005 70.5V71.5C48.9939 71.5 57.5005 62.9934 57.5005 52.5H56.5005ZM38.5005 70.5C38.4273 70.5 38.3543 70.4996 38.2813 70.4987L38.2694 71.4986C38.3463 71.4995 38.4234 71.5 38.5005 71.5V70.5ZM38.7754 93.2943V70.9987H37.7754V93.2943H38.7754ZM63.0821 72.9564L37.9644 92.9027L38.5863 93.6859L63.704 73.7395L63.0821 72.9564ZM88.8216 92.9027L63.704 72.9564L63.0821 73.7395L88.1997 93.6859L88.8216 92.9027Z"
                     fill="#A0A0A0"
                   />
                   <path
                     fill-rule="evenodd"
                     clip-rule="evenodd"
                     d="M37.7801 53.122V59.1487H38.7801V53.122H44.804V52.122H38.7801V46.1006H37.7801V52.122H31.7559L31.7559 53.122H37.7801Z"
                     fill="#A0A0A0"
                   />
                 </svg>
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
