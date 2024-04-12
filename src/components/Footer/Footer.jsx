import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.footer__link}
        href="mailto:kateworks2023@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        &#169; 2023. Ekaterina Pozhidaeva
      </a>

    </footer>
  );
}

export default Footer;
