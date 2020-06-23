import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import styles from './Start.module.css';
import Header from '../Header/index.jsx';
import Button from '../Button/index.jsx';

import AOS from 'aos';
import 'aos/dist/aos.css';


const Start = () => {
  AOS.init({
    once: true,
    easing: 'ease-in-out',
  });

return (
  <>
    <Header logo={true} />

    <div className={styles.button__wrapper}>
      <Button
        text="login"
        to="/"
      />
    </div>

    <div className={styles.lines}> </div>
    <article className={styles.container}>
      <section
        className={styles.header}
        data-aos="fade"
        data-aos-duration="3000"
      >
        <h1 className={`${styles.title} ${styles.titleHeader}`}>
          The things you’ll get to know
        </h1>
        <ul className={styles.benefits}>
          <li>Your ancestors</li>
          <li>Region and birth location</li>
          <li>Historical Events</li>
          <li>Lifechanging inventions</li>
          <li>World Wideroots</li>
        </ul>
        <Button
          className={styles.button}
          text={'Register now'}
          to={ROUTES.start}
        />
      </section>
      <section className={`${styles.content} ${styles.intro}`}>
        <div data-aos="fade-up">
          <div className={styles.titleCentered}>
            <h2 className={styles.title}>Find your Family Roots</h2>
            <p className={styles.titleCaps}>What can you expect?</p>
          </div>
          <div className={styles.intro__text}>
            <section>
              <h3 className={styles.subtitle}>Family Tree</h3>
              <p className={styles.text}>
                Get to know your ancestors by name and family name. You’ll
                discover when and where they lived over the years. If they were
                schooled and which profession they practiced. Important
                achievements they realized over the course of their life. All
                refined in a coherent story to get to know them better.
              </p>
            </section>
            <section>
              <h3 className={styles.subtitle}>DNA - Roots</h3>
              <p className={styles.text}>
                A more in depth result that unlocks a map where you can view
                your ancestors across the world. Discovering your roots in
                multiple continents that go back in time even more.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section
        className={`${styles.content} ${styles.titleCentered} ${styles.work}`}
      >
        <div data-aos="fade-up">
          <h2 className={styles.title}>How it all works</h2>
          <p className={styles.titleCaps}>
            Make a choice between the plans we offer
          </p>
        </div>
        <div className={styles.work__text} data-aos="fade-up">
          <section>
            <h3 className={styles.subtitle}>Standard Plan</h3>
            <img
              src="/assets/img/gettingstarted/roots.png"
              height="320px"
              alt="Roots"
            />
            <p className={styles.text}>
              The standard plan contains a search for your family tree and the
              respective ancestors.
            </p>
            <p className={styles.text}>
              Process: fill in your personal information, the information of
              your biological parents and all the extra info you might have
              regarding your family tree. The more information you provide, the
              easier our search will be.
            </p>
          </section>
          <section data-aos="fade-up">
            <h3 className={styles.subtitle}>Premium Plan</h3>
            <img
              src="/assets/img/gettingstarted/dna.png"
              height="320px"
              alt="DNA"
            />
            <p className={styles.text}>
              Standard plan including an interactive map of your roots.
            </p>
            <p className={styles.text}>
              Process: the premium plan needs the same information as the
              standard plan. The additional information we need, to search your
              roots, will be provided by a DNA test that can be done from home.
            </p>
          </section>
        </div>
      </section>

      <section
        className={`${styles.content} ${styles.timeline__wrapper} ${styles.titleCentered}`}
        data-aos="fade-up"
      >
        <div className={styles.timeline}>
          <div className={styles.timeline__item}>
            <img
              src="/assets/img/gettingstarted/timeline_1.svg"
              alt="timeline"
            />
            <p>Making your family tree</p>
          </div>
          <div className={`${styles.line} ${styles.lineOne}`}></div>
          <div className={styles.timeline__item}>
            <img
              src="/assets/img/gettingstarted/timeline_2.svg"
              alt="timeline"
            />
            <p>Scanning your DNA</p>
          </div>
          <div className={`${styles.line} ${styles.lineTwo}`}></div>
          <div className={styles.timeline__item}>
            <img
              src="/assets/img/gettingstarted/timeline_3.svg"
              alt="timeline"
            />
            <p>Researching your ancestors</p>
          </div>
          <div className={`${styles.line} ${styles.lineThree}`}></div>
          <div className={styles.timeline__item}>
            <img
              src="/assets/img/gettingstarted/timeline_4.svg"
              alt="timeline"
            />
            <p>Finished</p>
          </div>
        </div>
        <div className={styles.wait__text}>
          <h2 className={styles.subtitle}>Waiting Time</h2>
          <p className={styles.text}>
            Your information will be processed by our team. We’ll complete your
            family tree and analyse the DNA sample to find the hidden mysteries
            you’ve always wanted to know. This search takes time so we ask for
            your trust and patience while we keep you updated along the way.
            You’ll get notified by email if your results are in and processed.
          </p>
        </div>
      </section>

      <section
        className={`${styles.titleCentered} ${styles.packages} ${styles.content}`}
      >
        <div data-aos="fade-up">
          <h2 className={styles.title}>Packages and Prices</h2>
          <p className={styles.titleCaps}>
            at the moment we offer two packages
          </p>
          <div className={styles.plans}>
            <section className={styles.plans__item}>
              <h3 className={styles.subtitle}>Standard Plan</h3>
              <p clasName={styles.plan__price}>$499</p>
              <ul className={styles.plan__benefits}>
                <li>Discover your ancestors </li>
                <li>Hear their stories</li>
                <li>DNA Test</li>
              </ul>
              <Button
                className={styles.button}
                text={'Get standard'}
                to={ROUTES.start}
              />
            </section>
            <section className={styles.plans__item}>
              <h3 className={styles.subtitle}>Premium Plan</h3>
              <p clasName={styles.plan__price}>$699</p>
              <ul className={styles.plan__benefits}>
                <li>Discover your ancestors </li>
                <li>Hear their stories</li>
                <li>DNA Test</li>
              </ul>
              <Button
                className={styles.button}
                text={'Get premium'}
                to={ROUTES.start}
              />
            </section>
          </div>
        </div>
      </section>

      <section className={`${styles.review} ${styles.content}`}>
        <div data-aos="fade-up">
          <h2 className={styles.title}>You shouldn't just take it from us</h2>
          <div>
            <img src="" alt="" />
            <p className={`${styles.text} ${styles.quote}`}>
              Thanks to FYFR I was able to understand myself better. It was a
              struggle I was having for so long and the way I was able to
              discover who I am was one I will never forget and would totally
              recommand.
            </p>
            <div className={styles.customer}>
              <img
                src="/assets/img/gettingstarted/customer.jpg"
                alt="Customer"
              />
              <div>
                <p>Chris Heyndrickx</p>
                <p className={styles.customer__type}>Customer</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-aos="fade-up"
        className={`${styles.footer} ${styles.content}`}
      >
        <h2 className={styles.title}>Start your FYFR journey now.</h2>
        <div>
          <Button
            className={styles.button}
            text={'Register now'}
            to={ROUTES.start}
          />
        </div>
      </section>
    </article>
  </>
);
};
export default Start;
