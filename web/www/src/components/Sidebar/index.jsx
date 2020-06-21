import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';
import { useObserver } from 'mobx-react-lite';
import Preview from '../Preview/index.jsx';
import Menu from '../Menu/index.jsx';

const Sidebar = ({type, content, toggle, setToggle}) => {

    const Content = () => {
      if (toggle && type === 'menu') {
        return <Menu />;
      } else if (toggle && type === 'preview') {
        return  <Preview ancestor={content} />
      } else {
          return '';
      }
    };

  return useObserver(() => (
    <div
      className={`${styles.sidebar} ${
        toggle ? styles.sidebarOpened : styles.sidebarClosed
      }`}
    >
      <button className={styles.close} onClick={() => setToggle(false)}>
        <img
          className={styles.image}
          src="/assets/img/close_arrow.svg"
          alt="close"
          height="18"
          width="25"
        />
      </button>
      <Content />
    </div>
  ));
  
};

Sidebar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Sidebar;
