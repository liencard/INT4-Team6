import React from 'react';
import styles from './Detail.module.css';
import Header from '../Header/index.jsx';

const Detail = () => {

  return (
    <>
      <Header logo={true} menu={true} />
      <section className={`${styles.container} ${styles.header}`}>
        <div className={styles.ancestor}>
          <p className={styles.generation}>Sixth Generation</p>
          <h1 className={styles.name}>
            Margaret <br />
            Evans
          </h1>
          <p className={styles.date}>1822 - 1884</p>
        </div>
        <div className={styles.intro}>
          <h2 className={styles.hidden}>Intro</h2>
          <section>
            <h3 className={styles.subtitle}>Origin</h3>
            <p>
              Margaret was born in 1822 in London, United Kingdom and came from
              a Middle class family, the Evans.
            </p>
          </section>
          <section>
            <h3 className={styles.subtitle}>Evans</h3>
            <p>
              Evans is a patronymic surname meaning "son of Evan." The given
              name Evan derives from the Welsh name Ifan, a cognate of John,
              meaning "gracious gift of Jehovah."
            </p>
          </section>
        </div>
      </section>

      <h2>Industrial Revolution</h2>
      <span>1815 - 1914</span>
      <h3>The start</h3>
      <p>
        During the 19th century life changed into the Industrial Revolution.
        Margaret was born into this revolution as a sewer. At the start of the
        century it caused many problems but later on the lifes of the people
        became more comfortable for the ordinary.
      </p>
      <h3>The conflict</h3>
      <p>
        A lot of people emigrated to Australia and North America to escape
        poverty, about 15 million people left Britain within 1815 and 1914.
        However plenty of people migrated to Britain as well. Many came from
        Ireland, fleeing for a terrible potato famine. Some Russian Jews, that
        were being persecuted, also fled to Britian in London.
      </p>
      <h3>Resulting in</h3>
      <p>
        Britain was ruled by the elite in the early 19th century, which
        Margaret’s parents were a part of. Only a small percentage of men were
        allowed to vote, which slowly changed and was given to more men. However
        females weren’t allowed to vote until the 1897.
      </p>
    </>
  );
};

export default Detail;
