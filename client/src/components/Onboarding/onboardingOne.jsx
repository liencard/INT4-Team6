import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import { useObserver } from 'mobx-react-lite';
import styles from './Onboarding.module.css';
import Button from '../Button/index.jsx';

const OnboardingOne = () => {

    return useObserver(() => (
        <>
            <div 
                className={styles.onboarding__wrapper}
                style={{backgroundImage: `url(assets/img/onboarding_1.png)`
            }}>

            <div className={styles.header}>
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
                <div/>
            </div>

            <div className={styles.text__wrapper}>
                <h1 className={styles.title}>Interactive Dashboard</h1>
                <p className={styles.paragraph}>Discover your roots through an interactive dashboard. You get two different view options to dive into your ancestors.</p>
                <p className={styles.paragraph}>You can discover your ancestors by scrolling through the differents generations in your family tree.</p>
                <p className={styles.paragraph}>Or you can discover your ancestors by roots and see where all your ancestors originate from on a map.</p>
                <p className={(styles.paragraph, styles.last)}>Go and explore.</p>

                <Button text={'next step'} to="/onboarding-two" className={styles.button}/>
            </div>
    
            </div>
            
        </>
    ));
};

export default OnboardingOne;
