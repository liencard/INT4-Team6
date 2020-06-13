import React, { useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Login.module.css';
import Button from '../Button/index.jsx';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitLogin = async (e) => {
      e.preventDefault();
    }  

  return useObserver(() => (
    <div
      className={styles.login__wrapper}
      style={{ backgroundImage: `url(assets/img/lines_bg.png)` }}
    >
      <div className={styles.header}>
        <div className={styles.header__wrapper}>
          <img
            className={styles.img}
            src="./assets/img/FYFR.svg"
            alt="group img"
            width="37"
            height="39"
          />
          <p className={styles.header__text}>Login</p>
          <img
            className={styles.img}
            src="./assets/img/hamburger.svg"
            alt="group img"
            width="24"
            height="12"
          />
        </div>
      </div>

      <div
        className={styles.login__img}
        style={{ backgroundImage: `url(assets/img/login.png)` }}
      ></div>

      <div className={styles.content__wrapper}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        <form className={styles.form} onSubmit={handleSubmitLogin}>
          <div className={styles.form__wrapper}>
            <label className={styles.form__label}>Email</label>
            <input
              className={styles.form__input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <label className={styles.form__label}>Password</label>
            <input
              className={styles.form__input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />

            <div className={styles.form__extra}>
              <a href="#">forgot password?</a>
              <label>
                <input type="checkbox" name="remember" />
                Remember me
              </label>
            </div>
          </div>
          <Button text={'login'} to={'onboarding-one'} />

          <div className={styles.divider}>
            <div className={styles.line}></div>
            <p>or</p>
            <div className={styles.line}></div>
          </div>
        </form>

        <p className={styles.subtext}>
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  ));
};

export default Login;
