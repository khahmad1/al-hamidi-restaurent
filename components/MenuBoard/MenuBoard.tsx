/**
 * MenuBoard — server component.
 * Reads data/menu.json directly so any admin edit is reflected immediately
 * (no separate data.json needed).
 */
import fs from "fs";
import path from "path";
import Image from "next/image";
import { Cairo, DM_Sans } from "next/font/google";
import styles from "./MenuBoard.module.css";

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

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface RawItem {
  name: string;
  price: string;
  [key: string]: unknown;
}
interface RawCategory {
  name: string;
  items: RawItem[];
}
interface BoardItem {
  name: string;
  price: string;
}
interface Section {
  sectionTitle: string;
  layout: "single" | "double";
  titleLang: "ar" | "en";
  items: BoardItem[];
}

/* ─────────────────────────────────────────────
   Board layout config
   categoryKeys: names from menu.json to pull items from.
                 Use an array to merge multiple categories into one section.
───────────────────────────────────────────── */
interface SectionConfig {
  categoryKeys: string[];
  sectionTitle: string;
  layout: "single" | "double";
  titleLang: "ar" | "en";
}

const LAYOUT_CONFIG: {
  meta: { brandName: string; tagline: string };
  left: SectionConfig[];
  center: SectionConfig[];
  right: SectionConfig[];
} = {
  meta: { brandName: "Al-Hamidi", tagline: "SINCE 1999" },

  left: [
    {
      categoryKeys: ["مشروحة"],
      sectionTitle: "منقوشة مشروحة",
      layout: "single" as const,
      titleLang: "ar" as const,
    },
    {
      categoryKeys: ["Tart"],
      sectionTitle: "Tarte",
      layout: "single" as const,
      titleLang: "en" as const,
    },
    {
      categoryKeys: ["كروسان"],
      sectionTitle: "كروسان",
      layout: "single" as const,
      titleLang: "ar" as const,
    },
    {
      // Appears automatically when you add a "مرطبات" category in the admin
      categoryKeys: ["مرطبات"],
      sectionTitle: "مرطبات",
      layout: "single" as const,
      titleLang: "ar" as const,
    },
  ],

  center: [
    {
      categoryKeys: ["منقوش اكسترا"],
      sectionTitle: "منقوش اكسترا",
      layout: "double" as const,
      titleLang: "ar" as const,
    },
    {
      // Merge both سواريه categories into one section
      categoryKeys: ["سواريه بعجينة رقاقات", "سواريه بعجينة مناقيش"],
      sectionTitle: "سواريه",
      layout: "double" as const,
      titleLang: "ar" as const,
    },
    {
      categoryKeys: ["كعك"],
      sectionTitle: "كعك",
      layout: "double" as const,
      titleLang: "ar" as const,
    },
  ],

  right: [
    {
      categoryKeys: ["منقوش"],
      sectionTitle: "منقوش",
      layout: "single" as const,
      titleLang: "ar" as const,
    },
    {
      categoryKeys: ["اسمر"],
      sectionTitle: "منقوش أسمر",
      layout: "single" as const,
      titleLang: "ar" as const,
    },
    {
      categoryKeys: ["Events"],
      sectionTitle: "طلبات المناسبات",
      layout: "double" as const,
      titleLang: "ar" as const,
    },
  ],
};

/* ─────────────────────────────────────────────
   Data loading — reads menu.json from disk
───────────────────────────────────────────── */
function loadSections(
  configs: SectionConfig[],
  rawCategories: RawCategory[]
): Section[] {
  const result: Section[] = [];

  for (const cfg of configs) {
    const items: BoardItem[] = cfg.categoryKeys.flatMap((key) => {
      const cat = rawCategories.find((c) => c.name === key);
      return cat
        ? cat.items.map((item) => ({ name: item.name, price: item.price }))
        : [];
    });

    // Skip sections with no items (category doesn't exist yet in menu.json)
    if (items.length === 0) continue;

    result.push({
      sectionTitle: cfg.sectionTitle,
      layout: cfg.layout,
      titleLang: cfg.titleLang,
      items,
    });
  }

  return result;
}

/* ─────────────────────────────────────────────
   UI: Item row
───────────────────────────────────────────── */
function Row({ item, isEn = false }: { item: BoardItem; isEn?: boolean }) {
  return (
    <div className={`${styles.itemRow} ${isEn ? styles.ltr : ""}`.trim()}>
      <span className={`${styles.name} ${isEn ? styles.nameEn : ""}`.trim()}>
        {item.name}
      </span>
      <span className={styles.price}>{item.price}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   UI: Section block
───────────────────────────────────────────── */
function SectionBlock({ section }: { section: Section }) {
  const isEn = section.titleLang === "en";
  const titleCls = [styles.sectionTitle, isEn ? styles.sectionTitleEn : ""]
    .filter(Boolean)
    .join(" ");

  const half = Math.ceil(section.items.length / 2);
  const [a, b] = [section.items.slice(0, half), section.items.slice(half)];

  if (section.layout === "double") {
    return (
      <section className={styles.section} dir="rtl">
        <h2 className={titleCls}>{section.sectionTitle}</h2>
        <div className={styles.doubleGrid}>
          <div className={styles.doubleCol}>
            {a.map((item, i) => <Row key={`a${i}`} item={item} isEn={isEn} />)}
          </div>
          <div className={styles.doubleCol}>
            {b.map((item, i) => <Row key={`b${i}`} item={item} isEn={isEn} />)}
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

/* ─────────────────────────────────────────────
   UI: Logo
───────────────────────────────────────────── */
function Logo() {
  return (
    <div className={styles.logoBlock}>
      <div className={styles.logoImgWrap}>
        <Image
          src="/assets/Asset 1.png"
          alt="Al-Hamidi"
          fill
          sizes="(min-width:1600px) 260px, (min-width:1024px) 200px, 180px"
          style={{ objectFit: "contain", objectPosition: "center" }}
          priority
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main server component
───────────────────────────────────────────── */
export default function MenuBoard() {
  // Read directly from menu.json on every request (server-side)
  const menuPath = path.join(process.cwd(), "data", "menu.json");
  const raw: RawCategory[] = JSON.parse(fs.readFileSync(menuPath, "utf8"));

  const leftSections   = loadSections(LAYOUT_CONFIG.left,   raw);
  const centerSections = loadSections(LAYOUT_CONFIG.center, raw);
  const rightSections  = loadSections(LAYOUT_CONFIG.right,  raw);

  return (
    <div
      className={`${styles.board} ${cairo.className} ${cairo.variable} ${dmSans.variable}`}
      lang="ar"
    >
      <div className={styles.deco}    aria-hidden />
      <div className={styles.vignette} aria-hidden />

      <div className={styles.inner} dir="ltr">

        {/* Left: منقوشة مشروحة / Tarte / مرطبات */}
        <div className={styles.colLeft}>
          {leftSections.map((sec, i) => (
            <SectionBlock key={`l${i}`} section={sec} />
          ))}
        </div>

        {/* Center (wider): منقوش اكسترا / سواريه / كعك */}
        <div className={styles.colCenter}>
          {centerSections.map((sec, i) => (
            <SectionBlock key={`c${i}`} section={sec} />
          ))}
        </div>

        {/* Right: Logo + منقوش + منقوش أسمر */}
        <div className={styles.colRight}>
          <Logo />
          {rightSections.map((sec, i) => (
            <SectionBlock key={`r${i}`} section={sec} />
          ))}
        </div>

      </div>
    </div>
  );
}
