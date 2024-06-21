"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Filter from "@/components/Filter/Filter";
import Mp from "@/components/mp/Mp";
import mpsData from '../../lib/mp.json';

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');

  const handleFilterChange = (newFilter: 'all' | 'yes' | 'no') => {
    setFilter(newFilter);
  };

  return (
    <main className={styles.main}>
      <h1>Reminder For the 2024 Finance Bill Vote Results</h1>
      <Filter selectedFilter={filter} onFilterChange={handleFilterChange} />
      <Mp filter={filter} mpsData={mpsData} />
    </main>
  );
}
