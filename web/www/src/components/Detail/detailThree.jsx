import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { Link } from 'react-router-dom';

import Bookmark from '../../models/BookmarkModel';
import styles from './Detail.module.css';
import Header from '../Header/index.jsx';
import Loader from '../Loader/index.jsx';

const DetailThree = () => {
  const { id } = useParams();
  const { bookmarkStore, uiStore, userStore, ancestorStore } = useStore();
  const feedbackRef = useRef();

  // TIMELINE
  const chapterOneRef = useRef();
  const chapterTwoRef = useRef();
  const chapterThreeRef = useRef();
  const chapterFourRef = useRef();
  const chapterFiveRef = useRef();
  const chapterSixRef = useRef();
  const chapterSevenRef = useRef();

  let chapterLinks = [];
  chapterLinks.push(chapterOneRef.current);
  chapterLinks.push(chapterTwoRef.current);
  chapterLinks.push(chapterThreeRef.current);
  chapterLinks.push(chapterFourRef.current);
  chapterLinks.push(chapterFiveRef.current);
  chapterLinks.push(chapterSixRef.current);
  chapterLinks.push(chapterSevenRef.current);

  // ARTICLES
  const chapterOneRefArticle = useRef();
  const chapterTwoRefArticle = useRef();
  const chapterThreeRefArticle = useRef();
  const chapterFourRefArticle = useRef();
  const chapterFiveRefArticle = useRef();
  const chapterSixRefArticle = useRef();
  const chapterSevenRefArticle = useRef();

  let chapterArticles = [];
  chapterArticles.push(chapterOneRefArticle.current);
  chapterArticles.push(chapterTwoRefArticle.current);
  chapterArticles.push(chapterThreeRefArticle.current);
  chapterArticles.push(chapterFourRefArticle.current);
  chapterArticles.push(chapterFiveRefArticle.current);
  chapterArticles.push(chapterSixRefArticle.current);
  chapterArticles.push(chapterSevenRefArticle.current);

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
    bookmark,
    ancestorStore,
    bookmarkStore,
    id,
  ]);

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
          content={{
            woman: `${ancestorWoman.name}`,
            man: `${ancestorMan.name}`,
          }}
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
          className={`${styles.timeline__Ben} ${ visible ? styles.timeline__wrapper : styles.timeline__hidden}`}
        >
          <span>01</span>
          <span ref={chapterOneRef} data-chapter={1} className={styles.current}>
            Origin
          </span>
          <span>02</span>
          <span ref={chapterTwoRef} data-chapter={2}>
            Black lives in America
          </span>
          <span>03</span>
          <span ref={chapterThreeRef} data-chapter={3}>
            Benjamins life
          </span>
          <span>04</span>
          <span ref={chapterFourRef} data-chapter={4}>
            The lawyer
          </span>
          <span>05</span>
          <span ref={chapterFiveRef} data-chapter={5}>
            African Americans in WWII
          </span>
          <span>06</span>
          <span ref={chapterSixRef} data-chapter={6}>
            Change of America
          </span>
          <span>07</span>
          <span ref={chapterSevenRef} data-chapter={7}>
            Possible causes of death
          </span>
        </div>

        <p
          ref={feedbackRef}
          className={`${styles.feedback} ${
            bookmark ? styles.feedback__add : styles.feedback__remove
          }`}
        ></p>

        <div className={`${styles.detail} ${styles.detailBenjaminCole}`}>
          <div className={styles.container}>
            <article
              ref={chapterOneRefArticle}
              data-chapter={1}
              className={`${styles.intro} ${styles.content}`}
            >
              <div className={styles.intro__ancestor}>
                <p className={styles.generation}>Third Generation</p>
                <h1 className={styles.name}>
                  Benjamin <br />
                  Cole
                </h1>
                <p className={styles.date}>1903 - 1992</p>
              </div>
              <div className={styles.intro__info}>
                <h2 className={styles.hidden}>Intro</h2>
                <section>
                  <h3 className={styles.subtitle}>Origin</h3>
                  <p className={styles.text}>
                    Benjamin was born in 1903 in Cincinatti, Ohio USA. He was
                    raised by two parents who were slaves and he wanted a
                    change.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>Cole</h3>
                  <p className={styles.text}>
                    Back in the day, black man got received their name from
                    their owners. Cole was the owner of his father when he used
                    to be a slave.
                  </p>
                </section>
              </div>
            </article>

            <div className={styles.backgroundImage}></div>

            <article
              ref={chapterTwoRefArticle}
              data-chapter={2}
              className={`${styles.timeframe} ${styles.content}`}
            >
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>Black lives in America</h2>
                <span className={styles.dates}>1900 - 1990</span>
              </div>
              <div className={styles.timeframe__info}>
                <section>
                  <h3 className={styles.subtitle}>The start</h3>
                  <p className={styles.text}>
                    The begin of the nineteenth century was a time of
                    transformation in political and legal statusses of the
                    African Americans. They were freed from slavery and enjoyed
                    the greater rights of being a citizen. There was still a
                    long way to go for real eqaulity between the black and
                    whites.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>The conflict</h3>
                  <p className={styles.text}>
                    Through the early 1900s, many laws such as the Jim Crow laws
                    were passed in the Southern states, where most blacked
                    lived. These laws legally segregated schools, transportation
                    systems and lodging. This wasn’t equality.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>Resulting in</h3>
                  <p className={styles.text}>
                    African Americans moved to the north to work there, due
                    there were more work opportunities that also paid better.
                    Also the laws played a role.
                  </p>
                  <p className={styles.text}>
                    The north didn’t like this, so segregation became worse and
                    recial tensions sky rocked over into deadly voilence.
                  </p>
                </section>
              </div>
            </article>

            <article
              ref={chapterThreeRefArticle}
              data-chapter={3}
              className={`${styles.living} ${styles.content}`}
            >
              <div className={styles.living__text}>
                <h2 className={styles.title}>Benjamin's life</h2>
                <section>
                  <h3 className={styles.subtitle}>1903, Birthday</h3>
                  <p className={styles.text}>
                    The family Cole’s were located in Louisiana were Benjamin
                    was born and raised. They had two childeren, Issabelle whom
                    was 4 years older than him. Until 16 they went to school in
                    Louisiana but then decided to move to the North for a better
                    life and better paying jobs.
                  </p>
                  <p className={styles.text}>
                    In the North they stayed at Ohio. His father started working
                    in the auto industry, the Ford Motor Company.
                  </p>
                </section>
                <section>
                  <h3 className={styles.subtitle}>Benjamin's Family</h3>
                  <p className={styles.text}>
                    When Benjamin was 24 he met a special girl he married. She
                    was named Camillle Patterson. Camille was a maid and
                    Benjamin studied to become a lawyer in Ohio State
                    University. He didn’t agree with the lifestyle they were
                    living in and he wanted to make a change.
                  </p>
                  <p className={styles.text}>
                    He wanted his four childeren, Mary, Ruth, Eugene and George
                    to live in a better sitution than he grew up in. After
                    Benjamin finished his studies, they settled in Ohio.
                  </p>
                </section>
              </div>
              <div className={styles.living__img}>
                <img
                  className={styles.living__imgFamily}
                  src="/assets/img/detail/BenjaminCole_school.png"
                  alt="Benjamin's school"
                  width="725px"
                />
                <img
                  className={styles.living__imgPicture}
                  src="/assets/img/detail/BenjaminCole_family.png"
                  alt="Family pictures of Benjamin"
                  width="700px"
                />
              </div>
            </article>

            <article
              ref={chapterFourRefArticle}
              data-chapter={4}
              className={`${styles.lawyer} ${styles.content}`}
            >
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>The Lawyer</h2>
                <span className={styles.dates}>1927 - 1940</span>
              </div>

              <div className={styles.lawyer__info}>
                <div className={styles.lawyer__img}>
                  <img
                    src="/assets/img/detail/BenjaminCole_trail.png"
                    alt="Court trial"
                    width="850px"
                  ></img>
                </div>
                <section className={styles.lawyer__text}>
                  <h3 className={styles.subtitle}>Law firm</h3>
                  <p className={styles.text}>
                    After Benjamin graduated from Ohio State University he
                    procedeed to work in a law firm in Ohio. He specialized in
                    the right of citizens, most specificly most of his cases
                    were helping his fellow African Americans who weren’t
                    threated right by the justice system.
                  </p>
                  <p className={styles.text}>
                    Unfortuantly, the law firm doesn’t exist anymore.
                  </p>
                </section>
              </div>
            </article>

            <article
              ref={chapterFiveRefArticle}
              data-chapter={5}
              className={`${styles.timeframe} ${styles.content}`}
            >
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>African Americans in WWII</h2>
                <span className={styles.dates}>1941 - 1945</span>
              </div>
              <div className={styles.living}>
                <div className={styles.war__text}>
                  <section>
                    <h3 className={styles.subtitle}>
                      The beginning of of WWII
                    </h3>
                    <p className={styles.text}>
                      During World War II, the African Americans were prepared
                      to fight for the “Four Freedoms” - freedom of speech, of
                      worship, freedom from want and from fear - by President
                      Franklin D. Roosevelt. More than 3 million black Americans
                      registered, with some 500,000 seeing action overseas.
                      Black and white people were separated in different units.
                      Black servicemen were frustrated and forced to combat
                      racism.
                    </p>
                    <p className={styles.text}>
                      The first African American hero was Dorie Miller, who
                      carried a wounded crewmember to safety and went to a
                      machine gun post to shoot down several Japanese planes
                      during the attack on Pearl Harbor.
                    </p>
                  </section>
                  <section>
                    <h3 className={styles.subtitle}>Benjamin's Family</h3>
                    <p className={styles.text}>
                      When Benjamin was 24 he met a special girl he married. She
                      was named Camillle Patterson. Camille was a maid and
                      Benjamin studied to become a lawyer in Ohio State
                      University. He didn’t agree with the lifestyle they were
                      living in and he wanted to make a change.
                    </p>
                    <p className={styles.text}>
                      He wanted his four childeren, Mary, Ruth, Eugene and
                      George to live in a better sitution than he grew up in.
                      After Benjamin finished his studies, they settled in Ohio.
                    </p>
                  </section>
                </div>
                <div className={styles.war__img}>
                  <img
                    //className={styles.living__imgFamily}
                    src="/assets/img/detail/BenjaminCole_war.png"
                    alt="War picture Benjamin"
                    width="540px"
                  />
                </div>
              </div>
            </article>

            <article
              ref={chapterSixRefArticle}
              data-chapter={6}
              className={`${styles.event} ${styles.content}`}
            >
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>Change of America</h2>
                <span className={styles.dates}>1950 - 1960</span>
              </div>

              <div className={styles.event__wrapper}>
                <div className={styles.event__img}>
                  <img
                    className={styles.event__imgMLK}
                    src="/assets/img/detail/BenjaminCole_mlk.png"
                    alt="Martin Luther King waving"
                    width="800px"
                  />
                </div>
                <div className={styles.event__text}>
                  <section>
                    <h3 className={styles.subtitle}>Martin Luther King</h3>
                    <p className={styles.text}>
                      Martin Luther King was a well spokesperson and leader who
                      was Christian minister and activist in the civil rights
                      movement from 1955 until his assassinatin in 1968. He was
                      well known for protesting civil rights without violence
                      and civil disobedience. He was inspired by his Chrisitian
                      beliefs and the nonviolent activism of Mahatma Gandhi. He
                      was born in 1929 and killed with a gunshot wound in 1968.
                    </p>
                  </section>
                  <section>
                    <h3 className={styles.subtitle}>Awards</h3>
                    <p className={styles.text}>
                      King was awarded with the Presidential Medal of Freedom
                      and the Congressional Gold Medal. He got his own day which
                      is a holiday in cities and states throughout the United
                      States. It was enacted at the federal level by legislation
                      by President Ronald Reagan in 1986.
                    </p>
                  </section>
                </div>
              </div>
            </article>

            <article
              ref={chapterSevenRefArticle}
              data-chapter={7}
              className={`${styles.death} ${styles.content}`}
            >
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>Cause of Death</h2>
                <span className={styles.dates}>1992</span>
              </div>
              <section className={styles.death__start}>
                <img
                  className={styles.death__img}
                  src="/assets/img/detail/BenjaminCole_death.png"
                  alt="Death"
                  width="525px"
                />
                <div className={styles.death__text}>
                  <h3 className={styles.subtitle}>Natural Death</h3>
                  <p className={styles.text}>
                    After Benjamin came back from war he continued being a
                    lawyer and was a father for his childeren.
                  </p>
                  <p className={styles.text}>
                    When he got older Benjamin started having heart issues. At
                    the age of 84 he got a heart attack and this is how he
                    passed away. Benjamin is now graved in Ohio Western Reserve
                    National Cemetery.
                  </p>
                </div>
              </section>
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

export default DetailThree;
