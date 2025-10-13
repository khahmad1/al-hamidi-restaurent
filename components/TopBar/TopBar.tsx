"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./TopBar.module.css";

export default function TopBar() {
  const [isTopBarActive, setIsTopBarActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldTopBarBeActive = scrollY > 30;
      setIsTopBarActive(shouldTopBarBeActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.topbar} ${isTopBarActive ? styles.active : ""}`}>
      <div className={styles.container}>
        <div className={styles["left-topbar"]}>
          <div className={styles["topbar-location"]}>
            <span className={styles["topbar-item"]}>
              Tripoli - Nakabet Al Ateba - Nearby by Howa-chicken
            </span>
          </div>
          <div className="separator"></div>
          <div className={styles["open-time"]}>
            <span className={styles["topbar-item"]}>
              Daily : 8.00 am to 5.00 pm
            </span>
          </div>
        </div>

        <div className={styles["phone-number"]}>
          <Image
            src="/assets/phone-icon.svg"
            alt="phoneIcone"
            width={12}
            height={12}
            style={{ display: "inline", marginRight: "10px" }}
          />
          <a
            href="https://api.whatsapp.com/send?phone=71942435"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline" }}
            className={styles["topbar-item"]}
          >
            +961 71942435
          </a>
        </div>
      </div>
    </div>
  );
}
