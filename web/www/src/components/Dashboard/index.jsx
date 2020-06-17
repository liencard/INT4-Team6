import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useObserver } from 'mobx-react-lite';
import Header from '../Header/index.jsx';

import ReactTooltip from 'react-tooltip';


const Dashboard = () => {
    const [menu, setMenu] = useState(false);

    const handleClickMenu = (e) => {
    e.stopPropagation();
    setMenu(true);
  };

  const url = window.location.pathname;

  return useObserver(() => (
    <>
      <Header logo={true} menu={true} content={true} toggleDashboard={true} />
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
            border="true"
            borderColor="grey"
            delayHide={700}
            className={styles.info__popup}
            place="top"
          />

          <div className={styles.footer__share}>
            <span className={styles.share__text}>share</span>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5056 12.0823C11.3546 12.2333 11.2246 12.3992 11.1123 12.5747L6.13285 9.55222C6.26454 9.22256 6.33917 8.86409 6.33917 8.48804C6.33917 8.11199 6.26454 7.75352 6.13314 7.42387L11.1137 4.42441C11.6252 5.2278 12.5219 5.7632 13.5432 5.7632C15.1321 5.7632 16.4248 4.47051 16.4248 2.8816C16.4248 1.29269 15.1321 0 13.5432 0C11.9543 0 10.6616 1.29269 10.6616 2.8816C10.6616 3.24353 10.7316 3.58874 10.8538 3.90803L5.86659 6.91152C5.35136 6.12657 4.4644 5.60644 3.45728 5.60644C1.86837 5.60644 0.575684 6.89913 0.575684 8.48804C0.575684 10.077 1.86837 11.3696 3.45728 11.3696C4.4644 11.3696 5.35107 10.8495 5.8663 10.0646L10.8526 13.0911C10.7287 13.4156 10.6613 13.7622 10.6613 14.1198C10.6613 14.8895 10.961 15.6134 11.5053 16.1574C12.0669 16.719 12.8049 17 13.5429 17C14.2809 17 15.0188 16.719 15.5805 16.1574C16.1248 15.6131 16.4245 14.8895 16.4245 14.1198C16.4245 13.3502 16.1248 12.6263 15.5805 12.0823C14.4569 10.9584 12.6291 10.9584 11.5056 12.0823ZM13.5432 0.57632C14.8142 0.57632 15.8485 1.61053 15.8485 2.8816C15.8485 4.15267 14.8142 5.18688 13.5432 5.18688C12.2721 5.18688 11.2379 4.15267 11.2379 2.8816C11.2379 1.61053 12.2718 0.57632 13.5432 0.57632ZM3.45757 10.7933C2.1865 10.7933 1.15229 9.75911 1.15229 8.48804C1.15229 7.21697 2.1865 6.18276 3.45757 6.18276C4.72865 6.18276 5.76285 7.21697 5.76285 8.48804C5.76285 9.75911 4.72865 10.7933 3.45757 10.7933ZM15.173 15.75C14.2742 16.6487 12.8118 16.6487 11.9131 15.75C11.4776 15.3146 11.2379 14.7354 11.2379 14.1198C11.2379 13.5043 11.4776 12.9251 11.9131 12.4897C12.3626 12.0402 12.9527 11.8157 13.5432 11.8157C14.1336 11.8157 14.7238 12.0402 15.1733 12.4897C15.6087 12.9251 15.8485 13.5043 15.8485 14.1198C15.8485 14.7354 15.6087 15.3146 15.173 15.75Z"
                fill="#A0A0A0"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  ));
};

export default Dashboard;
