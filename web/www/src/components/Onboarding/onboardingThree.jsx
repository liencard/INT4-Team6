import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import { useObserver } from 'mobx-react-lite';
import styles from './Onboarding.module.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  once: true,
  easing: 'ease-in',
});

const OnboardingThree = () => {

    return useObserver(() => (
        <>
            <div 
                className={`${styles.onboarding__wrapper} ${styles.onboarding__three}`}
            >

            <div className={styles.header}>
                <div className={styles.header__wrapper}>
                    <Link to={`${ROUTES.home}`}>
                        <img className={styles.img} src='./assets/img/AVOS.svg' alt="group img" width="37" height="39" />
                    </Link>
                    <div className="dashboard__views">
                        <NavLink to={`${ROUTES.onboardingOne}`} className={styles.tab} activeClassName={styles.tabActive}>
                            Dashboard
                        </NavLink>
                        <NavLink to={`${ROUTES.onboardingTwo}`} className={styles.tab} activeClassName={styles.tabActive}>
                            Ancestors
                        </NavLink>
                        <NavLink to={`${ROUTES.onboardingThree}`} className={styles.tab} activeClassName={styles.tabActive}>
                            Features
                        </NavLink>
                    </div>
                    <div className={styles.empty}/>
                </div>
            </div>

             <div 
                className={styles.onboarding__img}
                style={{backgroundImage: `url(assets/img/onboarding3.jpg)`}}
            ></div>

            <div className={styles.text__wrapper}>
                <h1 className={styles.title} data-aos="fade">Exciting Features</h1>
                <div className={styles.paragraph__wrapper} data-aos="fade">
                    <p className={styles.paragraph}>Found some very interesting story? Share it with a friend! Find similarities in your friend’s family tree, you might have a vague connection?</p>
                    <p className={styles.paragraph}>Stories that are worth the read should be bookmarked in your personal collection so you find them right away!</p>
                </div>
                <div className={styles.buttons__wrapper}>
                 <Link to={'onboarding-two'} className={styles.button__secondary}>
                    back
                </Link>
                <Link to={'ancestors'}className={styles.button} style={{backgroundImage: `url(./assets/img/arrow.svg)`}}>
                    next step
                </Link>
                </div>
            </div>
    
            </div>
            
        </>
    ));
};

export default OnboardingThree;
