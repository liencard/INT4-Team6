import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';

import Bookmark from '../../models/BookmarkModel';
import styles from './Detail.module.css';
import Header from '../Header/index.jsx';

const DetailOne = () => {

  const { id } = useParams();
  const { bookmarkStore, uiStore, userStore, ancestorStore } = useStore();

  const STATE_LOADING = 'loading';
  const STATE_DOES_NOT_EXIST = 'doesNotExist';
  const STATE_LOADED = 'fullyLoaded';
  
  const [ancestor, setAncestor] = useState(undefined);
  const [state, setState] = useState(STATE_LOADING);

  useEffect(() => {
    const loadAncestor = async (id) => {
      console.log("use effect")

      try {
        console.log("try");
        const ancestor = await ancestorStore.getAncestorById(23);
        console.log("done trying");
        // console.log(ancestor);
        setAncestor(ancestor);
        if (!ancestor) {
          setState(STATE_DOES_NOT_EXIST);
          return;
        }
        setAncestor(ancestor);
        setState(STATE_LOADED);

      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }
      }

    };
    loadAncestor(id);
  }, [id, ancestor, ancestorStore.ancestors, setAncestor]);




  const handleClickBookmark = async () => {
    await userStore.loadAllUsers();
    uiStore.setCurrentUser(userStore.resolveUser('4e8baf11-bb77-3f6b-97d1-69b8e51c2ebe'));

    const bookmarkedAncestor = new Bookmark({
      user_id: uiStore.currentUser.id,
      ancestor_id: ancestor.id,
      store: bookmarkStore,
    });
    bookmarkedAncestor.create();
  }




  return useObserver(() => {
    if (state === STATE_DOES_NOT_EXIST) {
      return <p>does not exist</p>;
    }
    if (state === STATE_LOADING) {
      return <p>loading</p>;
    }

    return (
      <>
        <Header
          logo={true}
          menu={true}
          togglePartners={true}
          content={{ name: 'Naam hier', partner: 'Partner naam' }}
        />

        <div className={styles.buttonsTest}>
          <button className={styles.addBookmark} onClick={handleClickBookmark}>
            Add to bookmarks
          </button>
          {/* link */}
          <p>Previous generation</p>
          <p>Next generation</p>
        </div>

        <div className={`${styles.detail} ${styles.detailMargeretEvans}`}>
          <div className={styles.container}>
            <article className={`${styles.intro} ${styles.content}`}>
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
                    Margaret was born in 1822 in London, United Kingdom and came
                    from a Middle class family, the Evans.
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

            <article className={`${styles.timeframe} ${styles.content}`}>
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

            <article className={`${styles.living} ${styles.content}`}>
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
                  src="./assets/img/detail/MargeretEvans_family.png"
                  alt="Family"
                  width="260px"
                />
                <img
                  src="./assets/img/detail/MargeretEvans_house.png"
                  alt="House"
                  width="560px"
                />
              </div>
            </article>

            <article className={`${styles.work} ${styles.content}`}>
              <h2 className={styles.hidden}>Work</h2>
              <img
                className={styles.work__img}
                src="./assets/img/detail/MargeretEvans_work.png"
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

            <article>
              <div className={styles.titleCentered}>
                <h2 className={styles.title}>Cause of Death</h2>
                <span className={styles.dates}>1815 - 1914</span>
              </div>
              <section className={styles.death__start}>
                <img
                  className={styles.death__img}
                  src="./assets/img/detail/MargeretEvans_death.png"
                  alt="Death"
                  width="540px"
                />
                <div className={styles.death__text}>
                  <h3 className={styles.subtitle}>The start</h3>
                  <p className={styles.text}>
                    During the 19th century life changed into the Industrial
                    Revolution. Margaret was born into this revolution as a
                    sewer. At the start of the century it caused many problems
                    but later on the lifes of the people became more comfortable
                    for the ordinary.
                  </p>
                </div>
              </section>
            </article>
          </div>
        </div>
      </>
    );
  });
};

export default DetailOne;