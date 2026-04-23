"use client"
import Image from "next/image";
import { Cairo, DM_Sans } from "next/font/google";
import styles from "./MenuBoard.module.css";
import board from "@/data/data.json";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-ar",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-en",
});

/* ── Types ── */
type MenuItem = { name: string; price: string };
type Section = {
  sectionTitle: string;
  layout: "single" | "double";
  titleLang?: "ar" | "en";
  items: MenuItem[];
};
type BoardData = {
  meta: { brandName: string; tagline: string };
  left: Section[];
  center: Section[];
  right: { sections: Section[] };
};

const data = board as BoardData;

/* ── Helpers ── */
function half(arr: MenuItem[]): [MenuItem[], MenuItem[]] {
  const m = Math.ceil(arr.length / 2);
  return [arr.slice(0, m), arr.slice(m)];
}

/* ── Item row ── */
function Row({ item, isEn = false }: { item: MenuItem; isEn?: boolean }) {
  return (
    <div className={`${styles.itemRow} ${isEn ? styles.ltr : ""}`.trim()}>
      <span className={`${styles.name} ${isEn ? styles.nameEn : ""}`.trim()}>
        {item.name}
      </span>
      <span className={styles.price}>{item.price}</span>
    </div>
  );
}

/* ── Section block ── */
function SectionBlock({ section }: { section: Section }) {
  const isEn = section.titleLang === "en";
  const titleCls = [styles.sectionTitle, isEn ? styles.sectionTitleEn : ""]
    .filter(Boolean)
    .join(" ");

  if (section.layout === "double") {
    const [a, b] = half(section.items);
    return (
      <section className={styles.section} dir="rtl">
        <h2 className={titleCls}>{section.sectionTitle}</h2>
        <div className={styles.doubleGrid}>
          <div className={styles.doubleCol}>
            {a.map((item, i) => (
              <Row key={`a${i}`} item={item} isEn={isEn} />
            ))}
          </div>
          <div className={styles.doubleCol}>
            {b.map((item, i) => (
              <Row key={`b${i}`} item={item} isEn={isEn} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} dir={isEn ? "ltr" : "rtl"}>
      <h2 className={titleCls}>{section.sectionTitle}</h2>
      <div className={styles.itemList}>
        {section.items.map((item, i) => (
          <Row key={i} item={item} isEn={isEn} />
        ))}
      </div>
    </section>
  );
}

/* ── Logo — uses the real brand asset ── */
function Logo() {
  return (
    <div className={styles.logoBlock}>
      <div className={styles.logoImgWrap}>
        <Image
          src="/assets/Asset 1.png"
          alt={data.meta.brandName}
          fill
          sizes="(min-width:1600px) 260px, (min-width:1024px) 200px, 180px"
          style={{ objectFit: "contain", objectPosition: "center" }}
          priority
        />
      </div>
    </div>
  );
}

/* ── Main board ── */
export default function MenuBoard() {
  return (
    <div
      className={`${styles.board} ${cairo.className} ${cairo.variable} ${dmSans.variable}`}
      lang="ar"
    >
      {/* Decorative background layers */}
      <div className={styles.deco} aria-hidden />
      <div className={styles.vignette} aria-hidden />

      {/* 3-column grid — dir:ltr keeps columns Left | Center | Right */}
      <div className={styles.inner} dir="ltr">

        {/* Column 1: منقوشة مشروحة / Tarte / مرطبات */}
        <div className={styles.colLeft}>
          {data.left.map((sec, i) => (
            <SectionBlock key={`l${i}`} section={sec} />
          ))}
        </div>

        {/* Column 2 (wider): منقوش اكسترا / سواريه / كعك */}
        <div className={styles.colCenter}>
          {data.center.map((sec, i) => (
            <SectionBlock key={`c${i}`} section={sec} />
          ))}
        </div>

        {/* Column 3: Logo + منقوش + منقوش أسمر */}
        <div className={styles.colRight}>
          <Logo />
          {data.right.sections.map((sec, i) => (
            <SectionBlock key={`r${i}`} section={sec} />
          ))}
        </div>

      </div>
    </div>
  );
}
