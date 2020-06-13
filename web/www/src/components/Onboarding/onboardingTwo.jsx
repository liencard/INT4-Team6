import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import { useObserver } from 'mobx-react-lite';
import styles from './Onboarding.module.css';

const OnboardingTwo = () => {

    return useObserver(() => (
        <>
            <div 
                className={styles.onboarding__wrapper}
                style={{backgroundImage: `url(assets/img/lines_bg.png)`}}
            >

            <div className={styles.header}>
                <div className={styles.header__wrapper}>
                    <img className={styles.img} src='./assets/img/fyfr.svg' alt="group img" width="37" height="39" />
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
                style={{backgroundImage: `url(assets/img/onboarding2.png)`}}
            ></div>

            <div className={styles.text__wrapper}>
                <h1 className={styles.title}>Get to know your ancestors</h1>
                <div className={styles.paragraph__wrapper}>
                    <p className={styles.paragraph}>Found an ancestor you’re curious about? Browse through different branches of your family tree to discover new stories.</p>
                    <p className={styles.paragraph}>Read their story and get a taste of what there life was like. Who they were, what they did and which important historic events took place when they lived.</p>
                </div>
                <Link to={'onboarding-three'}className={styles.button} style={{backgroundImage: `url(./assets/img/arrow.svg)`}}>
                    next step
                </Link>
            </div>
    
            </div>
            
        </>
    ));
};

export default OnboardingTwo;
