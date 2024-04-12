import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton/CloseButton';
import Overlay from '../Overlay/Overlay';
import { classNames } from '../../../utils';
import styles from './Popup.module.css';

function Popup({
  isVisible,
  onClose,
  element,
}) {
  const handleEscPress = useCallback((event) => {
    if (event.key === 'Escape') onClose();
  }, [onClose]);

  const handleOverlayClick = useCallback((event) => {
    if (event.target === event.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keyup', handleEscPress);
    } else {
      document.removeEventListener('keyup', handleEscPress);
    }
  }, [isVisible, handleEscPress]);

  const overlayClass = classNames(styles.popup, isVisible && styles.popup_visible);

  return (
    <Overlay className={overlayClass} onClick={handleOverlayClick}>
      <div className={styles.popup__content}>
        <CloseButton
          aria-label="Close"
          className={styles.popup__button}
          onClick={onClose}
          tabIndex={0}
        />
        {element}
      </div>
    </Overlay>
  );
}

Popup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  element: PropTypes.node.isRequired,
};

export default Popup;
