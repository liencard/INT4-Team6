import React from 'react';
import styles from './Dashboard.module.css';
import { useObserver } from 'mobx-react-lite';
import Header from '../Header/index.jsx';
import PopupShare from '../Popup/popupShare.jsx';
import PopupPlay from '../Popup/popupPlay.jsx';

import ReactTooltip from 'react-tooltip';
/* dashboard*/
const Dashboard = () => {

  const url = window.location.pathname;

  return useObserver(() => (
    <>
      <Header logo={true} menu={true} content={true} toggleDashboard={true} />

      {url === '/ancestors' ? <PopupPlay /> : ''}

      <div className={styles.container}>
        <div className={styles.dashboard__footer}>
          <svg
            data-tip={`${
              url === '/ancestors'
                ? 'Travel through generations of ancestors by dragging & scrolling'
                : 'Click or scroll on a region to zoom in and find your ancestors.'
            }`}
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            className={styles.share__icon}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="13.5" cy="13.5" r="13" stroke="#A0A0A0" />
            <path
              d="M14.7414 16.93V12.916C14.7414 11.098 14.8674 10.288 15.0474 10.198V10.108H12.1314V10.198C13.1574 10.198 13.2474 10.846 13.2654 12.16V16.93C13.2474 18.244 13.1574 18.91 12.1314 18.91V19H15.8754V18.91C14.8494 18.91 14.7414 18.244 14.7414 16.93ZM14.0034 8.218C14.5254 8.218 14.9574 7.786 14.9574 7.228C14.9574 6.67 14.5254 6.22 14.0034 6.22C13.4634 6.22 13.0494 6.67 13.0494 7.228C13.0494 7.786 13.4634 8.218 14.0034 8.218Z"
              fill="#A0A0A0"
            />
          </svg> 

          <ReactTooltip
            effect="solid"
            border={true}
            borderColor="grey"
            delayHide={700}
            className={styles.info__popup}
            place="top"
          />

          <div className={styles.footer__share}>
            <PopupShare />
          </div>
        </div>
      </div>
    </>
  ));
};

export default Dashboard;
