import React, { useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import styles from './Popup.module.css';

const PopupShare = () => {

  const [link, setLink] = useState('https://findyourfamilyroots.com/u/497412/789789988548?&perm=see');
  const copyInput = useRef();

  const handleCopyLink = e => {
    e.preventDefault();

    // COPY TEXT TO CLIPBOARD
    copyInput.current.select();
    copyInput.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

  const contentStyle = {
    maxWidth: '70rem',
    width: '90%',
    border: 'none',
    boxShadow: '-20px 0px 25px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(25px)',
    background: 'rgba(28, 28, 28, 0.6)',
  };

  const contentTooltipStyle = {
    border: '1px solid #A0A0A0',
    background: 'rgba(28, 28, 28, 0.6)',
    color: '#707070',
    borderRadius: '.4rem',
    padding: '1rem 1.5rem'
  };

  return (
    <>
      <Popup
        trigger={
          <button className={styles.share__btn}>
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
          </button>
        }
        modal
        contentStyle={contentStyle}
      >
        {(close) => (
          <div className={`${styles.modal} ${styles.share}`}>
            <button className={styles.close} onClick={close}>
              &times;
            </button>
            <div className={styles.header}> Share your story </div>
            <div className={styles.content}>
              <p className={styles.intro}>
                Invite a friend to meet your ancestors.
              </p>
            </div>

            <div className="actions">
              <form className={styles.form__share} onSubmit={handleCopyLink}>
                <input
                  className={styles.form__input}
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.currentTarget.value)}
                  ref={copyInput}
                />
                <Popup
                  trigger={(open) => (
                    <button className={styles.link__btn}>
                      {open ? 'Copied link' : 'generate link'}
                    </button>
                  )}
                  position="top center"
                  closeOnDocumentClick
                  contentStyle={contentTooltipStyle}
                >
                  <span>Link copied to clipboard</span>
                </Popup>
              </form>
            </div>

            <label className={styles.checkbox}>
              <input type="checkbox" name="remember" />
              <span className={styles.checkbox__input}></span>I agree by
              checking the box that I am sharing my personal family tree and
              information.
            </label>
          </div>
        )}
      </Popup>
    </>
  );

};

export default PopupShare;
