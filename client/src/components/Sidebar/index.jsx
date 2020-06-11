import React from 'react';
import styles from './Sidebar.module.css';
import { useObserver } from 'mobx-react-lite';
import Preview from '../Preview/index.jsx';

const Sidebar = ({type, content, toggle, setToggle}) => {

    const Content = () => {
      if (toggle && type === 'menu') {
        return 'menu komt hier'
      } else if (toggle && type === 'preview') {
        return  <Preview ancestor={content} />
      } else {
          return '';
      }
    };

  return useObserver(() => (
    <div className={`${styles.sidebar} ${toggle ? styles.sidebarOpened : styles.sidebarClosed}`}>
      <Content />
    </div>
  ));
  
};

export default Sidebar;
