import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton/CloseButton';
import Overlay from '../Overlay/Overlay';
import styles from './Notification.module.css';

function Notification({ onClose, children }) {
  const parentHasNoScroll = useRef(null);
  const buttonRef = useRef(null);

  const handleEscPress = useCallback((event) => {
    if (event.key === 'Escape') onClose();
  }, [onClose]);

  const handleOverlayClick = useCallback((event) => {
    if (event.target === event.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    parentHasNoScroll.current = document.body.classList.contains('body-no-scroll');
    if (!parentHasNoScroll.current) {
      document.body.classList.add('body-no-scroll');
    }
    buttonRef.current.focus();

    return () => {
      if (!parentHasNoScroll.current) {
        document.body.classList.remove('body-no-scroll');
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleEscPress);
    return () => document.removeEventListener('keyup', handleEscPress);
  }, [handleEscPress]);

  const element = (
    <Overlay className={styles.popup} onClick={handleOverlayClick}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label="Error message"
        aria-describedby="popup-text"
        className={styles.popup__content}
      >
        <CloseButton
          ref={buttonRef}
          aria-label="Close"
          tabIndex={0}
          onClick={onClose}
          className={styles.popup__button}
        />
        <span id="popup-text" className={styles.popup__text}>
          {children}
        </span>
      </div>
    </Overlay>
  );

  const notificationRoot = document.getElementById('notification');

  return (
    <>
      {createPortal(element, notificationRoot)}
    </>
  );
}

Notification.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Notification;
