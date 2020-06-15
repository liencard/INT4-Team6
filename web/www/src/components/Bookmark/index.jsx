import React from 'react';
import styles from './Bookmark.module.css';
import { useObserver } from 'mobx-react-lite';

const Bookmark = ({bookmark}) => {

    const imgName = bookmark.name.split(' ').join('');

    return useObserver(() => (
      <>
        <article className={styles.bookmark}>
          <div className={styles.bookmark__info}>
            <h3 className={styles.bookmark__name}>{bookmark.name}</h3>
            <p className={styles.bookmark__date}>
              {bookmark.birthdate} - {bookmark.deathdate}
            </p>
          </div>
          <img
            className={styles.bookmark__img}
            src={`./assets/img/ancestors/thumbnail/${imgName}.jpg`}
            alt="ancestor"
            width="300"
            height="300"
          />
        </article>
      </>
    ));
};

export default Bookmark;
