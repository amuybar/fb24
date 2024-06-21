"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './Nav.module.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className={styles.nav}>
      <div className={`${styles.menu} ${styles.center}`} ref={menuRef}>
        {/* Bars icon */}
        <span className={`${styles.btn} ${styles.bars}`} onClick={handleMenuToggle}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </span>


        {/* Navigation links */}
        <ul className={`${styles.ul} ${isOpen ? styles.open : ''}`}>
          <li>
            <a href="#" className={styles.a}>
             @2023 Bill
            </a>
          </li>
          <li>
            <a href="#" className={styles.a}>
              Other Bills
            </a>
          </li>
          <li>
            <a href="#" className={styles.a}>
              Protest Heros
            </a>
          </li>
          <li>
            <a href="#" className={styles.a}>
               GenZ Reload
            </a>
          </li>
          <li>
            <a href="#" className={styles.a}>
              News
            </a>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
