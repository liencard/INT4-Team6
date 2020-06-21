import React, { useState } from 'react';
import styles from './Login.module.css';
import { useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';

const Login = ({login}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const {uiStore, userStore} = useStore();
    console.log(uiStore.currentUser);

    // const handleSubmitLogin = async (e) => {
    //   e.preventDefault();
    //   //await userStore.loadAllUsers();
    //   //uiStore.setCurrentUser(userStore.resolveUser('4e8baf11-bb77-3f6b-97d1-69b8e51c2ebe'));
    //   if (
    //     password === uiStore.currentUser.password &&
    //     email === uiStore.currentUser.email
    //   ) {
    //     history.push(ROUTES.ancestors);
    //   }
    // };  

    return useObserver(() => (
      <div
        className={`${styles.content__wrapper} ${
          login ? styles.content__wrapperOpened : styles.content__wrapperClosed
        }`}
      >
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        {/* <form className={styles.form} onSubmit={handleSubmitLogin}> */}
        <form className={styles.form}>
          <div className={styles.form__wrapper}>
            <label className={styles.form__label}>Email</label>
            <div className={styles.input__wrapper}>
              <svg
                width="19"
                height="15"
                viewBox="0 0 512 390"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M467 0H45C20.218 0 0 20.196 0 45V345C0 369.72 20.128 390 45 390H467C491.72 390 512 369.872 512 345V45C512 20.28 491.872 0 467 0ZM460.786 30L256.954 233.833L51.359 30H460.786ZM30 338.788V51.069L174.479 194.309L30 338.788ZM51.213 360L195.783 215.43L246.44 265.652C252.304 271.466 261.767 271.447 267.607 265.606L317 216.213L460.787 360H51.213ZM482 338.787L338.213 195L482 51.212V338.787Z"
                  fill="white"
                />
              </svg>
              <input
                className={styles.form__input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                //required
              />
            </div>
            <label className={styles.form__label}>Password</label>
            <div className={styles.input__wrapper}>
              <svg
                width="19"
                height="23"
                viewBox="0 0 12 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2383 6.80432V4.27051C10.2451 3.12402 9.78716 2.02162 8.96969 1.21772C8.17936 0.430782 7.1448 0 6.04919 0C6.03223 0 6.01188 0 5.99492 0C3.65784 0.00339199 1.75833 1.91647 1.75833 4.27051V6.80432C0.876411 6.90948 0.231934 7.64893 0.231934 8.54441V14.2362C0.231934 15.2029 1.00531 16 1.97202 16H10.028C10.9947 16 11.7681 15.2029 11.7681 14.2362V8.54441C11.7647 7.65232 11.1202 6.90948 10.2383 6.80432ZM2.43333 4.27051H2.43672C2.43672 2.28959 4.03435 0.668221 5.99831 0.668221H6.0017C6.9345 0.664829 7.82998 1.03456 8.49142 1.6926C9.17999 2.37439 9.56329 3.30379 9.5565 4.27051V6.80772H8.81027V4.27051C8.81705 3.50053 8.51177 2.76108 7.96566 2.21836C7.45008 1.70278 6.75133 1.41107 6.02205 1.41107H6.0017C4.44139 1.41107 3.17957 2.69324 3.17957 4.26712V6.80772H2.43333V4.27051V4.27051ZM8.13526 4.27051V6.80772H3.86136V4.27051C3.86136 3.06975 4.8179 2.09286 6.00509 2.09286H6.02545C6.57495 2.09286 7.1041 2.31333 7.49418 2.70341C7.908 3.11724 8.14205 3.6837 8.13526 4.27051ZM11.1202 14.2463C11.1202 14.8399 10.6385 15.3216 10.0449 15.3216H1.98559C1.39199 15.3216 0.910331 14.8399 0.910331 14.2463V8.56137C0.910331 7.96778 1.39199 7.48611 1.98559 7.48611H10.0449C10.6385 7.48611 11.1202 7.96778 11.1202 8.56137V14.2463Z"
                  fill="white"
                />
                <path
                  d="M7.17196 11.1937C7.02271 10.6679 6.54444 10.3083 5.99832 10.3083C5.32331 10.3083 4.7738 10.8545 4.7738 11.5329C4.7738 12.079 5.13336 12.5572 5.65912 12.7065V13.6562C5.65912 13.8428 5.81176 13.9954 5.99832 13.9954C6.18488 13.9954 6.33752 13.8428 6.33752 13.6562V12.7065C6.9854 12.5199 7.36191 11.8415 7.17196 11.1937ZM5.99832 12.0756C5.69643 12.0756 5.45221 11.8314 5.45221 11.5295C5.45221 11.2276 5.69643 10.9834 5.99832 10.9834C6.30021 10.9834 6.54444 11.2276 6.54444 11.5295C6.54444 11.8314 6.30021 12.0756 5.99832 12.0756Z"
                  fill="white"
                />
              </svg>
              <input
                className={styles.form__input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                //required
              />
            </div>
            <div className={styles.form__extra}>
              <a href="#" className={styles.link}>
                Forgot password?
              </a>
              <label className={styles.checkbox}>
                <input type="checkbox" name="remember" />
                <span className={styles.checkbox__input}></span>
                Remember me
              </label>
            </div>
          </div>
          {/* <button className={styles.button} to={'/onboarding-one'}>Login </button> */}
          <Link
            to={ROUTES.onboardingOne}
            className={styles.button}
            style={{ backgroundImage: `url(./assets/img/arrow.svg)` }}
          >
            Login
          </Link>

          <div className={styles.divider}>
            <div className={styles.line}></div>
            <p>or</p>
            <div className={styles.line}></div>
          </div>
        </form>

        <p className={styles.subtext}>
          Don't have an account?{' '}
          <a className={styles.link} href="#">
            Sign up
          </a>
        </p>
      </div>
    ));
};

export default Login;
