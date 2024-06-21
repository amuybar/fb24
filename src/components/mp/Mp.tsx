import React, { useEffect, useState } from 'react';
import styles from './Mp.module.css';
import Search from '../search/Search';

interface MP {
    name: string;
    vote: string;
    party: string;
    constituency:string;
}

interface MpProps {
    filter: 'all' | 'yes' | 'no';
    mpsData: MP[];
}

const Mp: React.FC<MpProps> = ({ filter, mpsData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [filteredMps, setFilteredMps] = useState<MP[]>(mpsData);
    const votes = filteredMps[currentIndex].vote;
    const containerClass = votes === 'NO' ? styles.greenBackground : styles.redBackground;


// TRANSITION OF THE DISPLAY CARD AFTER 5 SECONDS
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredMps.length);
                setFade(true);
            }, 4000); 
        }, 5000); 

        return () => clearInterval(interval);
    }, [filteredMps]);
//   FILTER MPS BASED ON SELECTED FILTER
    useEffect(() => {
        if (filter === 'all') {
            setFilteredMps(mpsData);
        } else {
            const results = mpsData.filter(mp => mp.vote === filter.toUpperCase());
            setFilteredMps(results);
        }
        setCurrentIndex(0); 
    }, [filter, mpsData]);
    // SEARCH FUNCTION
    const handleSearch = (searchTerm: string) => {
        try {
            const sanitizedSearchTerm = searchTerm.trim().toLowerCase();
            
            if (sanitizedSearchTerm === '') {
                
                setFilteredMps(mpsData);
            } else {
                const results = mpsData.filter(mp =>
                    mp.name.toLowerCase().includes(sanitizedSearchTerm) ||
                    mp.constituency.toLowerCase().includes(sanitizedSearchTerm)
                );
                setFilteredMps(results);
            }
        } catch (error) {
            console.error('Error occurred during search:', error);
        }
    };
    

    return (
        <div className={styles.container}>
             <Search onSearch={handleSearch} />
            {filteredMps.length > 0 ? (
                <div className={`${styles.cont} ${containerClass}`}>
                    <div className={styles.terminal_toolbar}>
                        <div className={styles.butt}>
                            <button className={styles.btnno}></button>
                            <button className={styles.btnyes}></button>
                            <button className={styles.btn}></button>
                        </div>
                        <p className={styles.user}>
                        {filteredMps.length > 0 && currentIndex <                     filteredMps.length ? (
                            filteredMps[currentIndex].name
                        ) : (
                            "No MP available"
                            
                        )}
                    </p>
                        <div className={styles.add_tab}>
                            +
                        </div>
                    </div>
                    <div className={styles.terminal_body}>
                        <div className={styles.terminal_promt}>
                            <span className={styles.terminal_user}>Voted: {filteredMps[currentIndex].vote}</span>
                            <span className={styles.terminal_location}>~</span>
                            <span className={styles.terminal_bling}>$</span>
                            {filteredMps[currentIndex].vote === 'NO' ? (
                                <span className={`${styles.enemy} ${fade ? styles.typing : ''}`}>
                                    Friend of the People
                                </span>
                            ) : (
                                <span className={`${styles.friend} ${fade ? styles.typing : ''}`}>
                                    We shall Meet 2027
                                </span>
                            )}
                            <span className={styles.terminal_cursor}></span>
                        </div>
                        <div className={styles.gap}></div>
                        <div className={styles.terminalpromt}>
                            <span className={styles.terminal_area}>Constituency </span>
                            <span className={styles.terminal_location}>~</span>
                            <span className={styles.terminal_bling}>$</span>
                            <span className={`${styles.enemy} ${fade ? styles.typing : ''}`}> 
                            {filteredMps[currentIndex].constituency}
                                </span>
                            <span className={styles.terminal_cursor}></span>
                        </div>
                        <div className={styles.gap}></div>
                        <div className={styles.terminal_promt}>
                            <span className={styles.terminal_user}>Party</span>
                            <span className={styles.terminal_location}>~</span>
                            <span className={styles.terminal_bling}>$</span>
                            
                                <span className={`${styles.enemy} ${fade ? styles.typing : ''}`}>
                                {filteredMps[currentIndex].party}
                                </span>
                            <span className={styles.terminal_cursor}></span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default Mp;
