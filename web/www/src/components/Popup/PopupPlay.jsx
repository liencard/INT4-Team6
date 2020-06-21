import React from 'react';
import Popup from 'reactjs-popup';
import styles from './Popup.module.css';

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
              width="40"
              height="40"
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
            <a className={styles.close} onClick={close}>
              &times;
            </a>
            <div className={styles.header}> New Feature, Coming Soon </div>
            <div className={styles.content}>
              <p className={styles.intro}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
                a nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
                quibusdam voluptates delectus doloremque, explicabo tempore
                dicta adipisci fugit amet dignissimos?
              </p>

              <iframe
                src="https://player.vimeo.com/video/414068439"
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
