import React, { useState } from 'react';
import styles from './Login.module.css';
import { useObserver } from 'mobx-react-lite';
import Button from '../Button/index.jsx';

const Login = ({login}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmitLogin = async (e) => {
      e.preventDefault();
    };  

    return useObserver(() => (
      <div className={`${styles.content__wrapper} ${login ? styles.content__wrapperOpened : styles.content__wrapperClosed}`}>
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
              <a href="#" className={styles.link}>
                Forgot password?
              </a>
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
          Don't have an account?{' '}
          <a className={styles.link} href="#">
            Sign up
          </a>
        </p>
      </div>
    ));
};

export default Login;
