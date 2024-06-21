import React from 'react';
import styles from './Filter.module.css';

interface FilterProps {
  selectedFilter: 'all' | 'yes' | 'no';
  onFilterChange: (filter: 'all' | 'yes' | 'no') => void;
}

const Filter: React.FC<FilterProps> = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className={styles.filter}>
      <p>Filter By:</p>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${selectedFilter === 'all' ? styles.active : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`${styles.button} ${selectedFilter === 'yes' ? styles.active : ''}`}
          onClick={() => onFilterChange('yes')}
        >
          Yes
        </button>
        <button
          className={`${styles.button} ${selectedFilter === 'no' ? styles.active : ''}`}
          onClick={() => onFilterChange('no')}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default Filter;
