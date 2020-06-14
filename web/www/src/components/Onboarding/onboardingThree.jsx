import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import { useObserver } from 'mobx-react-lite';
import styles from './Onboarding.module.css';

const OnboardingThree = () => {

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
                style={{backgroundImage: `url(assets/img/onboarding3.jpg)`}}
            ></div>

            <div className={styles.text__wrapper}>
                <h1 className={styles.title}>Exciting Features</h1>
                <div className={styles.paragraph__wrapper}>
                    <p className={styles.paragraph}>Found some very interesting story? Share it with a friend! Find similarities in your friend’s family tree, you might have a vague connection?</p>
                    <p className={styles.paragraph}>Stories that are worth the read should be bookmarked in your personal collection so you find them right away!</p>
                </div>
                <Link to={'ancestors'}className={styles.button} style={{backgroundImage: `url(./assets/img/arrow.svg)`}}>
                    next step
                </Link>
            </div>
    
            </div>
            
        </>
    ));
};

export default OnboardingThree;
