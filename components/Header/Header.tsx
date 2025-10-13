"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldHeaderBeActive = scrollY > 150;
      setIsHeaderActive(shouldHeaderBeActive);

      // Determine active section based on scroll position
      const sections = ["Home", "AboutUs", "Menu", "Location"];
      const sectionElements = sections.map((id) => document.getElementById(id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleContainerClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className={`${styles.header} ${isHeaderActive ? styles.active : ""}`}>
      <div className={styles.container}>
        <div className={`${styles.logo} ${styles.bigscreen}`}>
          <Link href="/admin" passHref>
            <Image
              src="/assets/Asset 1.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        <div className={`${styles["nav-bar"]} ${isOpen ? styles.active : ""}`}>
          <div className={`${styles.logo} ${styles.smallscreen}`}>
            <Link href="/admin" passHref>
              <Image
                src="/assets/Asset 1.png"
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          <button className={styles.exit} onClick={handleContainerClick}>
            <Image
              src="/assets/x-icon.svg"
              alt="exit-logo"
              width={24}
              height={24}
            />
          </button>

          <ul>
            <li>
              <a
                onClick={handleContainerClick}
                href="#Home"
                style={{ textDecoration: "none", color: "white" }}
                className={`${styles["navbar-link"]} ${
                  styles["hover-underline"]
                } ${activeSection === "Home" ? styles.active : ""}`}
              >
                <div className={styles.separator}></div>
                <span className="span">Home</span>
              </a>
            </li>
            <li>
              <a
                onClick={handleContainerClick}
                href="#AboutUs"
                style={{ textDecoration: "none", color: "white" }}
                className={`${styles["navbar-link"]} ${
                  styles["hover-underline"]
                } ${activeSection === "AboutUs" ? styles.active : ""}`}
              >
                <div className={styles.separator}></div>
                <span className="span">About Us</span>
              </a>
            </li>
            <li>
              <a
                onClick={handleContainerClick}
                href="#Menu"
                style={{ textDecoration: "none", color: "white" }}
                className={`${styles["navbar-link"]} ${
                  styles["hover-underline"]
                } ${activeSection === "Menu" ? styles.active : ""}`}
              >
                <div className={styles.separator}></div>
                <span className="span">Menu</span>
              </a>
            </li>
            <li>
              <a
                onClick={handleContainerClick}
                href="#Location"
                style={{ textDecoration: "none", color: "white" }}
                className={`${styles["navbar-link"]} ${
                  styles["hover-underline"]
                } ${activeSection === "Location" ? styles.active : ""}`}
              >
                <div className={styles.separator}></div>
                <span className="span">Contact & Location</span>
              </a>
            </li>
          </ul>

          <div className={styles["text-center"]}>
            <p className={`headline-1 ${styles["navbar-title"]}`}>Visit Us</p>
            <div className="body-4">
              Tripoli - Nakabet Al Ateba - Nearby by Howa-chicken <br />
              to chater hassan
            </div>
            <p className="body-4 navbar-text">Open: 8.00 am to 5.00 pm</p>
            <div className="separator"></div>
            <a
              onClick={handleContainerClick}
              href="https://api.whatsapp.com/send?phone=71942435"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--gold-crayola)" }}
              className="body-1 contact-number hover-underline"
            >
              +961 71942435
            </a>
          </div>
        </div>

        <button
          className={styles["nav-open-btn"]}
          onClick={handleContainerClick}
        >
          <span className={`${styles.line} ${styles["line-1"]}`}></span>
          <span className={`${styles.line} ${styles["line-2"]}`}></span>
          <span className={`${styles.line} ${styles["line-3"]}`}></span>
        </button>

        <div
          className={`${styles.overLay} ${isOpen ? styles.active : ""}`}
          onClick={handleContainerClick}
        ></div>
      </div>
    </div>
  );
}
