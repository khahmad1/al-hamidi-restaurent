"use client";

import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.preload} ${!loading ? styles.loaded : ""}`}>
      <div className={styles.circle}></div>
      <p className={styles.text}>Al Hamidi</p>
    </div>
  );
}
