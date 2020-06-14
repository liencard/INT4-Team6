import React from 'react';
import styles from './Login.module.css';

import { useObserver } from 'mobx-react-lite';

const Login = ({login}) => {
    return useObserver(() => (
        <div className={`${styles.login__wrapper} ${login ? styles.login__wrapperOpened : styles.login__wrapperClosed}`}>
            <p>login view</p>
        </div>
    ));
};

export default Login;
