import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { Link } from 'react-router-dom';

import Bookmark from '../../models/BookmarkModel';
import styles from './Detail.module.css';
import Header from '../Header/index.jsx';
import Loader from '../Loader/index.jsx';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  once: true,
  easing: 'ease-in-out',
});

const DetailOne = () => {
  const { id } = useParams();
  const { bookmarkStore, uiStore, userStore, ancestorStore } = useStore();
  const feedbackRef = useRef();

  // TIMELINE
  const chapterOneRef = useRef();
  const chapterTwoRef = useRef();
  const chapterThreeRef = useRef();
  const chapterFourRef = useRef();
  const chapterFiveRef = useRef();

  let chapterLinks = [];
  chapterLinks.push(chapterOneRef.current);
  chapterLinks.push(chapterTwoRef.current);
  chapterLinks.push(chapterThreeRef.current);
  chapterLinks.push(chapterFourRef.current);
  chapterLinks.push(chapterFiveRef.current);

  // ARTICLES
  const chapterOneRefArticle = useRef();
  const chapterTwoRefArticle = useRef();
  const chapterThreeRefArticle = useRef();
  const chapterFourRefArticle = useRef();
  const chapterFiveRefArticle = useRef();

  let chapterArticles = [];
  chapterArticles.push(chapterOneRefArticle.current);
  chapterArticles.push(chapterTwoRefArticle.current);
  chapterArticles.push(chapterThreeRefArticle.current);
  chapterArticles.push(chapterFourRefArticle.current);
  chapterArticles.push(chapterFiveRefArticle.current);

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
  }, [
    ancestor,
    ancestorStore.ancestors,
    ancestorStore,
    id,
  ]);
  /* bookmark past aan -> useEffect wordt opnieuw opgeroepen, bookmark & bookmarkStore hier uitgehaald */

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

      /* ancestor uit database halen */
      await bookmarkStore.loadAllBookmarks();
      const ancestorId = parseInt(id);
      const bookmarkedAncestorCreated = bookmarkStore.getBookmarkByAncestorid(
        ancestorId
      );
      console.log(bookmarkedAncestorCreated); // ancestor & user id wel gekend enzo, maar we hebben id zelf nodig zoals bij useffect
      /* dit moet de ancestor zijn in database met id en al gekend!!! Anders kan delete pas na page reload */
      
      await setBookmark(bookmarkedAncestor);
      setBookmark(bookmarkedAncestor);

      feedbackRef.current.classList.add(styles.feedback__add); 
      feedbackRef.current.classList.remove(styles.feedback__remove);
      feedbackRef.current.innerHTML = 'Added Bookmark';
    } else {
      await bookmark.delete();
      setBookmark(false);
      feedbackRef.current.classList.add(styles.feedback__remove);
      feedbackRef.current.classList.remove(styles.feedback__add); 
      feedbackRef.current.innerHTML = 'Removed Bookmark';
    }
  };

  window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + window.innerHeight / 2;
    chapterLinks.forEach((link) => {
      if (link) {
        chapterArticles.forEach((article) => {
          if (link.dataset.chapter === article.dataset.chapter) {
            if (
              article.offsetTop <= fromTop &&
              article.offsetTop + article.offsetHeight > fromTop
            ) {
              link.classList.add(styles.current);
            } else {
              link.classList.remove(styles.current);
            }
          }
        });
      }
    });
  });


  // SCROLL NAV
  const [visible, setVisibility] = useState(true);
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;
    setPrevScrollpos(currentScrollPos);
    setVisibility(visible)
  };

  window.addEventListener('scroll', handleScroll);



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
          content={{ woman: `${ancestorWoman.name}`, man: `${ancestorMan.name}`}}
          to={{ woman: `${ancestor.woman}`, man: `${ancestor.man}` }}
        />

        <div className={`${visible ? styles.buttons : styles.buttons__hidden}`}>
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

        <div
          className={`${
            visible ? styles.timeline__wrapper : styles.timeline__hidden
          }`}
        >
          <span>01</span>
          <span ref={chapterOneRef} data-chapter={1} className={styles.current}>
            Origin
          </span>
          <span>02</span>
          <span ref={chapterTwoRef} data-chapter={2}>
            Industrial Revolution
          </span>
          <span>03</span>
          <span ref={chapterThreeRef} data-chapter={3}>
            Evens Family
          </span>
          <span>04</span>
          <span ref={chapterFourRef} data-chapter={4}>
            Profession
          </span>
          <span>05</span>
          <span ref={chapterFiveRef} data-chapter={5}>
            Cause of death
          </span>
        </div>

          {/* LEGE BOX */}

        {/* <p
          ref={feedbackRef}
          className={`${styles.feedback} ${
            bookmark ? styles.feedback__add : styles.feedback__remove
          }`}
        ></p> */}

        {/* VOEGT VANZELF TERUG TOE */}

        <p ref={feedbackRef}></p>

        <div className={`${styles.detail} ${styles.detailMargeretEvans}`}>
          <div className={styles.container}>
            <article
              ref={chapterOneRefArticle}
              data-chapter={1}
              className={`${styles.intro} ${styles.content}`}
            >
              <div className={styles.intro__ancestor}>
                <p className={styles.generation}>Sixth Generation</p>
                <h1 className={styles.name}>
                  Margaret <br />
                  Evans
                </h1>
                <p className={styles.date}>1822 - 1884</p>
              </div>
              <div className={styles.intro__info}>
                <h2 className={styles.hidden}>Intro</h2>
                <section>
                  <h3 className={styles.subtitle}>Origin</h3>
                  <p className={styles.text}>
                    Margaret was born in 1822 in Wockingham, England, United
                    Kingdom and came from a Middle class family, the Evans.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>Evans</h3>
                  <p className={styles.text}>
                    Evans is a patronymic surname meaning "son of Evan." The
                    given name Evan derives from the Welsh name Ifan, a cognate
                    of John, meaning "gracious gift of Jehovah."
                  </p>
                </section>
              </div>
            </article>

            <div className={styles.backgroundImage} data-aos="fade-up"></div>

            <article
              ref={chapterTwoRefArticle}
              data-chapter={2}
              className={`${styles.timeframe} ${styles.content}`}
              data-aos="fade-up"
            >
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>Industrial Revolution</h2>
                <span className={styles.dates}>1815 - 1914</span>
              </div>
              <div className={styles.timeframe__info}>
                <section>
                  <h3 className={styles.subtitle}>The start</h3>
                  <p className={styles.text}>
                    During the 19th century life changed into the Industrial
                    Revolution. Margaret was born into this revolution as a
                    sewer. At the start of the century it caused many problems
                    but later on the lifes of the people became more comfortable
                    for the ordinary.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>The conflict</h3>
                  <p className={styles.text}>
                    A lot of people emigrated to Australia and North America to
                    escape poverty, about 15 million people left Britain within
                    1815 and 1914.
                  </p>
                  <p className={styles.text}>
                    However plenty of people migrated to Britain as well. Many
                    came from Ireland, fleeing for a terrible potato famine.
                    Some Russian Jews, that were being persecuted, also fled to
                    Britian in London.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>Resulting in</h3>
                  <p className={styles.text}>
                    Britain was ruled by the elite in the early 19th century,
                    which Margaret’s parents were a part of. Only a small
                    percentage of men were allowed to vote, which slowly changed
                    and was given to more men. However females weren’t allowed
                    to vote until the 1897.
                  </p>
                </section>
              </div>
            </article>

            <article
              ref={chapterThreeRefArticle}
              data-chapter={3}
              className={`${styles.living} ${styles.content}`}
              data-aos="fade-up"
            >
              <div className={styles.living__text}>
                <h2 className={styles.title}>Family Evans</h2>
                <p className={styles.text}>
                  The family Evans lived in a very comfortable house. For the
                  first time, furniture was made in mass-production which meant
                  that it was cheaper. However this was in cost of the design.
                  Due to this, middle class families had overcrowded homes with
                  lots of furtniture, ornaments and knick-knacks.
                </p>
                <p className={styles.text}>
                  They had a house with two rooms upstairs and two downstairs.
                  The two rooms downstairs were used kitching and living room
                  while thet wo upstairs were bedrooms.
                </p>
              </div>
              <div className={styles.living__img}>
                <img
                  className={styles.living__imgFamily}
                  src="/assets/img/detail/MargeretEvans_family.png"
                  alt="Family"
                  width="260px"
                />
                <img
                  src="/assets/img/detail/MargeretEvans_house.png"
                  alt="House"
                  width="560px"
                />
              </div>
            </article>

            <article
              ref={chapterFourRefArticle}
              data-chapter={4}
              className={`${styles.work} ${styles.content}`}
              data-aos="fade-up"
            >
              <h2 className={styles.hidden}>Work</h2>
              <img
                className={styles.work__img}
                src="/assets/img/detail/MargeretEvans_work.png"
                alt="Work"
                width="800px"
              />
              <div className={styles.work__text}>
                <section>
                  <h3 className={styles.title}>Sewer</h3>
                  <p className={styles.text}>
                    Back in the 1800’s a lot of women used to be charwomen,
                    laundresses or servant. While men and childeren usually
                    worked in the factories and did long shifts every day.
                  </p>
                </section>
                <section>
                  <h3 className={styles.title}>Clothes</h3>
                  <p className={styles.text}>
                    In the 19th century, only the rich could afford nice looking
                    clothing. Shoes, for example, were a luxery and not a lot of
                    people owned them. Being a sewer back in the day was a good
                    job. These types of clothing were called corsets and
                    knickers.
                  </p>
                </section>
              </div>
            </article>

            <article
              ref={chapterFiveRefArticle}
              data-chapter={5}
              className={`${styles.death} ${styles.content}`}
              data-aos="fade-up"
            >
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>Cause of Death</h2>
                <span className={styles.dates}>1815 - 1914</span>
              </div>
              <section className={styles.death__start}>
                <img
                  className={styles.death__img}
                  src="/assets/img/detail/MargeretEvans_death.png"
                  alt="Death"
                  width="540px"
                />
                <div className={styles.death__text}>
                  <h3 className={styles.subtitle}>Pneumonia</h3>
                  <p className={styles.text}>
                    In the 19th century, the three leading causes of death were
                    pneumonia, tuberculosis and diarrhea.
                  </p>
                  <p className={styles.text}>
                    Margaret got pneumonia when she was 62, which was pretty old
                    for back then. Pneumonia is an acute or chronic inflammation
                    of the longs which could be caused by a virus or a bacteria.
                    Sometimes it appears by microorganisms or by phiscial or
                    chemical irritants
                  </p>
                </div>
              </section>
            </article>

            <div className={styles.buttons__generation}>
              {ancestor.mother || ancestor.father ? (
                <Link
                  to={`${ancestor.woman ? ancestor.mother : ancestor.father}`}
                  className={styles.buttons__previous}
                  activeClassName={styles.tabActive}
                >
                  Previous generation
                </Link>
              ) : (
                ''
              )}
              ;
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

export default DetailOne;
