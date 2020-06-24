import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { NavLink } from 'react-router-dom';

import Header from '../Header/index.jsx';
import styles from './Detail.module.css';
import Loader from '../Loader/index.jsx';
//import { Timeline, Bookmark } from 'react-vertical-timeline';

const DetailOther = () => {

  const { id } = useParams();
  const { bookmarkStore, ancestorStore } = useStore();
  

   // STATES
  const STATE_LOADING = 'loading';
  const STATE_DOES_NOT_EXIST = 'doesNotExist';
  const STATE_LOADED = 'fullyLoaded';
  
  const [ancestor, setAncestor] = useState(undefined);
  const [bookmark, setBookmark] = useState(undefined);
  const [ancestorWoman, setAncestorWoman] = useState(undefined);
  const [ancestorMan, setAncestorMan] = useState(undefined);
  const [state, setState] = useState(STATE_LOADING);

  useEffect(() => {
    const loadAncestor = async (id) => {
      try {
            await ancestorStore.loadAllAncestors();
            await bookmarkStore.loadAllBookmarks();
            const ancestorId = parseInt(id);
            const ancestor = await ancestorStore.loadAncestor(ancestorId);
            const bookmarkedAncestor = bookmarkStore.getBookmarkByAncestorid(ancestorId);
            if (!ancestor) {
              setState(STATE_DOES_NOT_EXIST);
              return;
            }
            if (bookmarkedAncestor) {
              setBookmark(bookmarkedAncestor);
            }
            setAncestor(ancestor);
            const ancestorWoman = ancestorStore.getAncestorById(ancestor.woman);
            const ancestorMan = ancestorStore.getAncestorById(ancestor.man);
            setAncestorWoman(ancestorWoman);
            setAncestorMan(ancestorMan);
            setState(STATE_LOADED);
            
          } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }
      }
    };
      loadAncestor(id);
  }, [ancestor, ancestorStore.ancestors, bookmark, ancestorStore, bookmarkStore, id]);

  

  return useObserver(() => {
    if (state === STATE_DOES_NOT_EXIST) {
      return <p>does not exist</p>;
    }
    if (state === STATE_LOADING) {
      return <Loader />;
    }

    return (
      <>
        <Header
          logo={true}
          menu={true}
          togglePartners={true}
          content={{
            woman: `${ancestorWoman ? ancestorWoman.name : 'Unknown'}`,
            man: `${ancestorMan ? ancestorMan.name : 'Unknown'}`,
          }}
          to={{
            woman: `${ancestorWoman ? ancestor.woman : ancestor.man}`,
            man: `${ancestorMan ? ancestor.man : ancestor.woman}`,
          }}
          ancestor={ancestor}
        />
        <div className={`${styles.detail} ${styles.detail__other}`}>
          <div className={styles.container}>
            <article className={`${styles.intro} ${styles.content}`}>
              <div className={styles.intro__ancestor}>
                <p className={styles.generation}>
                  {ancestor.generation} Generation
                </p>
                <h1 className={styles.name}>{ancestor.name}</h1>
                <p className={styles.date}>
                  {ancestor.birthdate} - {ancestor.deathdate}
                </p>
              </div>
            </article>

            <div className={styles.buttons__generation}>
              {ancestor.mother || ancestor.father ? (
                <NavLink
                  to={`${ancestor.woman ? ancestor.mother : ancestor.father}`}
                  className={styles.buttons__previous}
                  activeClassName={styles.tabActive}
                >
                  Previous generation
                </NavLink>
              ) : (
                ''
              )}
              ;
              <NavLink
                to={`${ancestor.child}`}
                className={styles.buttons__next}
                activeClassName={styles.tabActive}
              >
                Next generation
              </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  });
};

export default DetailOther;
