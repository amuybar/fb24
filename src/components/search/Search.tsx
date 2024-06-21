"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.module.css';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        onSearch(searchTerm); 
    };

    const handleClear = () => {
        setSearchTerm('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
        onSearch(''); 
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className={styles.searchContainer}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search by name or area"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button onClick={handleClear}>Clear</button> 
            <button onClick={() => onSearch(searchTerm)}>Search</button>
        </div>
    );
};

export default Search;
