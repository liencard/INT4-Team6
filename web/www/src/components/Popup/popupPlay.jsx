import React from 'react';
import Popup from 'reactjs-popup';
import styles from './Popup.module.css';

/* play button */
const PopupPlay = () => {
  const contentStyle = {
    maxWidth: '70rem',
    width: '90%',
    border: 'none',
    boxShadow: '-20px 0px 25px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(25px)',
    background: 'rgba(28, 28, 28, 0.6)',
  };

  return (
    <>
      <Popup
        trigger={
          <button className={styles.play__btn}>
            <svg
              className={styles.play__icon}
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#C4C4C4" />
              <path
                d="M17.2802 27.3558L17.2802 12.3428L26.9944 19.4077L17.2802 27.3558Z"
                fill="black"
              />
            </svg>
          </button>
        }
        modal
        contentStyle={contentStyle}
      >
        {(close) => (
          <div className={styles.modal}>
            <button className={styles.close} onClick={close}>
              &times;
            </button>
            <div className={styles.header}> New Feature, Coming Soon </div>
            <div className={styles.content}>
              <p className={styles.intro}>
                Sit relaxed on your couch and experience your roots. A new free
                feature will release next month.
              </p>

              <iframe
                src="https://player.vimeo.com/video/431288217?autoplay=1&title=0&byline=0&portrait=0"
                title="play"
                width="580"
                height="326"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default PopupPlay;
