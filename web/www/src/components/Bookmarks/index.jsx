import React, { useState, useEffect } from 'react';
import styles from './Bookmarks.module.css';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import Bookmark from '../Bookmark/index.jsx';
import Header from '../Header/index.jsx';
import Loader from '../Loader/index.jsx';

 const Bookmarks = () => {

  const STATE_LOADING = 'loading';
  const STATE_LOADED = 'loaded';
  const STATE_NOT_FOUND = 'notFound';

  const { bookmarkStore } = useStore();

  const [bookmarks, setBookmarks] = useState(undefined);
  const [state, setState] = useState(STATE_LOADING);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        await bookmarkStore.loadAllBookmarks();
        if (bookmarks) {
          setState(STATE_LOADED);
          return;
        }
        setBookmarks(bookmarkStore.bookmarks);
        setState(STATE_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_NOT_FOUND);
        }
      }
    };
    loadBookmarks();
  }, [setBookmarks, bookmarks, bookmarkStore]);
 
   return useObserver(() => {
    
    if (state === STATE_LOADING) {
      return (
        <>
          <Header logo={true} menu={true} content={true} text={"Bookmarked Ancestors"} />
          <Loader />
        </>
      )
    } 
    
    return (
      <>
        <Header
          logo={true}
          menu={true}
          content={true}
          text={'Bookmarked Ancestors'}
        />
        <div
          className={styles.container}
          style={{ backgroundImage: `url(assets/img/bookmark_bg.png)` }}
        >
          {bookmarkStore.bookmarks.length > 0 ? (
            <section className={styles.bookmarks}>
              <h2 className={styles.hidden}>Bookmarked</h2>
              <p className={styles.title}>
                Stories you've saved that are worth the read.
              </p>
              <div className={styles.bookmarks__wrapper}>
                <ul>
                  {bookmarkStore.bookmarks.map((bookmark) => (
                    <li key={bookmark.id} bookmarkid={bookmark.id}>
                      {console.log(bookmark)}
                      <Bookmark bookmark={bookmark} />
                    </li>
                  ))}
                </ul>
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
          ) : (
            <section className={styles.emty__state}>
              <h2 className={styles.hidden}>Bookmarked</h2>
              <p className={styles.title}>You haven't read any stories yet.</p>
              <div className={styles.bookmarks__wrapper}>
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
                <div className={styles.bookmark__empty}></div>
                <div className={styles.bookmark__empty}></div>
                <div className={styles.bookmark__empty}></div>
              </div>
            </section>
          )}
        </div>
      </>
    );
   });
 };

 export default Bookmarks;
