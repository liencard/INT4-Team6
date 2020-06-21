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

  // STATES
  const STATE_LOADING = 'loading';
  const STATE_DOES_NOT_EXIST = 'doesNotExist';
  const STATE_LOADED = 'fullyLoaded';

  const [ancestor, setAncestor] = useState(undefined);
  const [bookmark, setBookmark] = useState(undefined);
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
        setState(STATE_LOADED);
        const ancestorWoman = ancestorStore.getAncestorById(ancestor.woman);
        console.log(`${ancestorWoman.name}test`);
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
          content={{ woman: 'Camille Patterson', man: `${ancestor.name}` }}
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
          <span>Origin</span>
          <span>02</span>
          <span>Black lives in America</span>
          <span>03</span>
          <span>Benjamins life</span>
          <span>04</span>
          <span>The lawyer</span>
          <span>05</span>
          <span>African Americans in WWII</span>
        </div>

        <p
          ref={feedbackRef}
          className={`${styles.feedback} ${
            bookmark ? styles.feedback__add : styles.feedback__remove
          }`}
        ></p>

        <div className={`${styles.detail} ${styles.detailBenjaminCole}`}>
          <div className={styles.container}>
            <article className={`${styles.intro} ${styles.content}`}>
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

            <article className={`${styles.timeframe} ${styles.content}`}>
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

            <article className={`${styles.living} ${styles.content}`}>
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

            <article className={`${styles.profession} ${styles.content}`}>
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>The Lawyer</h2>
                <span className={styles.dates}>1927 - 1940</span>
              </div>


              <div className={styles.professionInfo}>
                {/* <img
                  className={styles.profession__img}
                  src="/assets/img/detail/BenjaminCole_trail.png"
                  alt="Court trial"
                  width="850px"
                /> */}
                <section>
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

            <article className={`${styles.timeframe} ${styles.content}`}>
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>African Americans in WWII</h2>
                <span className={styles.dates}>1941 - 1945</span>
              </div>
              <div className={styles.living}>
                <div className={styles.living__text}>
                  <section>
                    <h3 className={styles.subtitle}>1903, Birthday</h3>
                    <p className={styles.text}>
                      The family Cole’s were located in Louisiana were Benjamin
                      was born and raised. They had two childeren, Issabelle
                      whom was 4 years older than him. Until 16 they went to
                      school in Louisiana but then decided to move to the North
                      for a better life and better paying jobs.
                    </p>
                    <p className={styles.text}>
                      In the North they stayed at Ohio. His father started
                      working in the auto industry, the Ford Motor Company.
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
                <div className={styles.living__img}>
                  <img
                    //className={styles.living__imgFamily}
                    src="/assets/img/detail/BenjaminCole_war.png"
                    alt="War picture Benjamin"
                    width="490px"
                  />
                </div>
              </div>
            </article>

            <article className={`${styles.death} ${styles.content}`}>
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

export default DetailThree;
