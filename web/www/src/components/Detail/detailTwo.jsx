import React from 'react';
import styles from './Detail.module.css';
import Header from '../Header/index.jsx';

const DetailTwo = () => {

  return (
    <>
      <Header logo={true} menu={true} togglePartners={true} content={{name:'Naam hier', partner: 'Partner naam'}} />
      <div className={`${styles.detail} ${styles.detailMaryWallcott}`}>
        <div className={styles.container}>
          <article className={`${styles.intro} ${styles.content}`}>
            <div className={styles.intro__ancestor}>
              <p className={styles.generation}>Sixth Generation</p>
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
                  Margaret was born in 1787 in Ivory Coast, Africa.
                </p>
              </section>
              <section>
                <h3 className={styles.subtitle}>Wallcott</h3>
                <p className={styles.text}>
                  Evans is a patronymic surname meaning "son of Evan." The given
                  name Evan derives from the Welsh name Ifan, a cognate of John,
                  meaning "gracious gift of Jehovah."
                </p>
              </section>
            </div>
          </article>

          <article className={`${styles.timeframe} ${styles.content}`}>
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
                  European and the Far East. With the rise of American colonies
                  in the sixteenth century there was a need of slaves, which led
                  to kidnapping and enslavement of people from West Africa.
                </p>
              </section>
              <section>
                <h3 className={styles.subtitle}>The conflict</h3>
                <p className={styles.text}>
                  In the 18th century, Ivory Coast was invaded by two groups.
                  The Akans and The Agni’s. They occupied the southeast and the
                  centrail section. In 1843-1844, the year Mary passed away,
                  French Admiral Bouet-Willaumez signed treaties with the kings.
                  The French had control over the area until 1915, in the
                  beginning of World War One.
                </p>
              </section>
              <section>
                <h3 className={styles.subtitle}>Resulting in</h3>
                <p className={styles.text}>
                  In 1840’s, the French build fortified posts with the purpose
                  of permanent tranding centers. The first posts were in Assinie
                  and Grand-Bassanm which became the colony’s first capital. The
                  French kept treaties, hoping to be able to expand trade.
                </p>
              </section>
            </div>
          </article>

          <article className={`${styles.living} ${styles.content}`}>
            <div className={styles.living__text}>
              <h2 className={styles.title}>Unknown life</h2>
              <p className={styles.text}>
                Mary was born in the early 1800’s in Africa which we couldn’t
                find much information about. Here might be a picture we assume
                is her, since it was a passport picture with her name on it but
                we can’t confirm it, so take it with a grain of salt. The
                hairstyle was typical 1800’s hair. The other image is a picture
                the French took close to the river in Ivory Coast.
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

          <article>
            <div className={styles.titleCentered}>
              <h2 className={styles.title}>Possible causes of death</h2>
              <span className={styles.dates}>1787 - 1844</span>
            </div>
            <div>
              <section>
                <h3 className={styles.subtitle}>Slavery</h3>
                <p className={styles.text}>
                  At first, Ivory Coast traded gold, ivory and pepper with
                  European and the Far East. With the rise of American colonies
                  in the sixteenth century there was a need of slaves, which led
                  to kidnapping and enslavement of people from West Africa.
                </p>
              </section>
              <section>
                <h3 className={styles.subtitle}>Olderdom</h3>
                <p className={styles.text}>
                  In the 18th century, Ivory Coast was invaded by two groups.
                  The Akans and The Agni’s. They occupied the southeast and the
                  centrail section. In 1843-1844, the year Mary passed away,
                  French Admiral Bouet-Willaumez signed treaties with the kings.
                  The French had control over the area until 1915, in the
                  beginning of World War One.
                </p>
              </section>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default DetailTwo;