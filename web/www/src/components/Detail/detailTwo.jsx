import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { Link } from 'react-router-dom';

import Bookmark from '../../models/BookmarkModel';
import styles from './Detail.module.css';
import Header from '../Header/index.jsx';
import Loader from '../Loader/index.jsx';

const DetailTwo = () => {

  const { id } = useParams();
  const { bookmarkStore, uiStore, userStore, ancestorStore } = useStore();
  const feedbackRef = useRef();

    // TIMELINE
  const chapterOneRef = useRef();
  const chapterTwoRef = useRef();
  const chapterThreeRef = useRef();
  const chapterFourRef = useRef();

  let chapterLinks = [];
  chapterLinks.push(chapterOneRef.current);
  chapterLinks.push(chapterTwoRef.current);
  chapterLinks.push(chapterThreeRef.current);
  chapterLinks.push(chapterFourRef.current);

  // ARTICLES
  const chapterOneRefArticle = useRef();
  const chapterTwoRefArticle = useRef();
  const chapterThreeRefArticle = useRef();
  const chapterFourRefArticle = useRef();

  let chapterArticles = []
  chapterArticles.push(chapterOneRefArticle.current);
  chapterArticles.push(chapterTwoRefArticle.current);
  chapterArticles.push(chapterThreeRefArticle.current);
  chapterArticles.push(chapterFourRefArticle.current);

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
        const bookmarkedAncestor = bookmarkStore.getBookmarkByAncestorid(
          ancestorId
        );
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

  // ADD & REMOVE BOOKMARK
  const handleClickBookmark = async () => {
    await userStore.loadAllUsers();
    uiStore.setCurrentUser(
      userStore.resolveUser('4e8baf11-bb77-3f6b-97d1-69b8e51c2ebe')
    );
    if (!bookmark) {
      const bookmarkedAncestor = new Bookmark({
        user_id: uiStore.currentUser.id,
        ancestor_id: ancestor.id,
        store: bookmarkStore,
      });
      await bookmarkedAncestor.create();
      await setBookmark(bookmarkedAncestor);
      feedbackRef.current.classList.add(styles.feedback);
      feedbackRef.current.innerHTML = 'Added Bookmark';
    } else {
      await bookmark.delete();
      await setBookmark(false);
      feedbackRef.current.classList.add(styles.feedbackkk);
      feedbackRef.current.innerHTML = 'Removed Bookmark';
    }
  };

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
          content={{ woman: `${ancestorWoman.name}`, man: `${ancestorMan.name}` }}
          to={{ woman: `${ancestor.woman}`, man: `${ancestor.man}` }}
        />

        <div className={styles.buttons}>
          <button className={styles.addBookmark} onClick={handleClickBookmark}>
            {bookmark ? (
              <img
                src="/assets/img/icon_addedbookmark.svg"
                alt="bookmark icon"
                width="30"
                height="30"
              />
            ) : (
              <img
                src="/assets/img/icon_addbookmark.svg"
                alt="added bookmark icon"
                width="30"
                height="30"
              />
            )}
          </button>
        </div>

        <div className={styles.timeline__wrapper}>
          <span>01</span>
          <span ref={chapterOneRef} data-chapter={1}>Origin</span>
          <span>02</span>
          <span ref={chapterTwoRef} data-chapter={2}>Trade with europe and the americas</span>
          <span>03</span>
          <span ref={chapterThreeRef} data-chapter={3}>Unknown life</span>
          <span>04</span>
          <span ref={chapterFourRef} data-chapter={4}>Cause of death</span>
        </div>

        <p
          ref={feedbackRef}
          className={`${styles.feedback} ${
            bookmark ? styles.feedback__add : styles.feedback__remove
          }`}
        ></p>

        <div className={`${styles.detail} ${styles.detailMaryWallcott}`}>
          <div>
            <article ref={chapterOneRefArticle} data-chapter={1} className={`${styles.intro} ${styles.content}`}>
              <div className={styles.intro__ancestor}>
                <p className={styles.generation}>Seventh Generation</p>
                <h1 className={styles.name}>
                  Mary <br />
                  Wallcott
                </h1>
                <p className={styles.date}>1787 - 1844</p>
              </div>
              <div className={styles.intro__info}>
                <h2 className={styles.hidden}>Intro</h2>
                <section>
                  <h3 className={styles.subtitle}>Origin</h3>
                  <p className={styles.text}>
                    Mary was born in 1787 in Ivory Coast, Africa.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>Wallcott</h3>
                  <p className={styles.text}>
                    Evans is a patronymic surname meaning "son of Evan." The
                    given name Evan derives from the Welsh name Ifan, a cognate
                    of John, meaning "gracious gift of Jehovah."
                  </p>
                </section>
              </div>
            </article>

            <div className={styles.backgroundImage}></div>

            <article ref={chapterTwoRefArticle} data-chapter={2} className={`${styles.timeframe} ${styles.content}`}>
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>
                  Trade with Europe and the Americas
                </h2>
                <span className={styles.dates}>1483 - 1885</span>
              </div>
              <div className={styles.timeframe__info}>
                <section>
                  <h3 className={styles.subtitle}>The start</h3>
                  <p className={styles.text}>
                    At first, Ivory Coast traded gold, ivory and pepper with
                    European and the Far East. With the rise of American
                    colonies in the sixteenth century there was a need of
                    slaves, which led to kidnapping and enslavement of people
                    from West Africa.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>The conflict</h3>
                  <p className={styles.text}>
                    In the 18th century, Ivory Coast was invaded by two groups.
                    The Akans and The Agni’s. They occupied the southeast and
                    the centrail section. In 1843-1844, the year Mary passed
                    away, French Admiral Bouet-Willaumez signed treaties with
                    the kings. The French had control over the area until 1915,
                    in the beginning of World War One.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>Resulting in</h3>
                  <p className={styles.text}>
                    In 1840’s, the French build fortified posts with the purpose
                    of permanent tranding centers. The first posts were in
                    Assinie and Grand-Bassanm which became the colony’s first
                    capital. The French kept treaties, hoping to be able to
                    expand trade.
                  </p>
                </section>
              </div>
            </article>

            <article ref={chapterThreeRefArticle} data-chapter={3} className={`${styles.living} ${styles.content}`}>
              <div className={styles.living__text}>
                <h2 className={styles.title}>Unknown life</h2>
                <p className={styles.text}>
                  Mary was born in the early 1800’s in Africa which we couldn’t
                  find much information about. Here might be a picture we assume
                  is her, since it was a passport picture with her name on it
                  but we can’t confirm it, so take it with a grain of salt. The
                  hairstyle was typical 1800’s hair. The other image is a
                  picture the French took close to the river in Ivory Coast.
                </p>
              </div>
              <div className={styles.living__img}>
                <img
                  className={styles.living__imgFamily}
                  src="/assets/img/detail/MaryWallcott_life.png"
                  alt="Family"
                  width="760px"
                />
              </div>
            </article>

            <article ref={chapterFourRefArticle} data-chapter={4} className={`${styles.death} ${styles.content}`}>
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>Possible causes of death</h2>
                <span className={styles.dates}>1787 - 1844</span>
              </div>
              <div className={styles.death__start}>
                <section>
                  <h3 className={styles.subtitle}>Slavery</h3>
                  <p className={styles.text}>
                    At first, Ivory Coast traded gold, ivory and pepper with
                    European and the Far East. With the rise of American
                    colonies in the sixteenth century there was a need of
                    slaves, which led to kidnapping and enslavement of people
                    from West Africa.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>Olderdom</h3>
                  <p className={styles.text}>
                    In the 18th century, Ivory Coast was invaded by two groups.
                    The Akans and The Agni’s. They occupied the southeast and
                    the centrail section. In 1843-1844, the year Mary passed
                    away, French Admiral Bouet-Willaumez signed treaties with
                    the kings. The French had control over the area until 1915,
                    in the beginning of World War One.
                  </p>
                </section>
              </div>
            </article>

            <div className={styles.buttons__generation}>
              <Link
                to={`${ancestor.mother}`}
                className={styles.buttons__previous}
                activeClassName={styles.tabActive}
              >
                Previous generation
              </Link>
              <Link
                to={`${ancestor.child}`}
                className={styles.buttons__next}
                activeClassName={styles.tabActive}
              >
                Next generation
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  });
};

export default DetailTwo;