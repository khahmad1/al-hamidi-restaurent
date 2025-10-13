"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="home-section" id="Home">
      <div className="container">
        <div className="home-text-container">
          <div className="home-text">
            <div style={{ display: "flex", gap: "10px" }}>
              <span>اطلب </span>
              <p> , معجنات الحميدي </p>
            </div>
            <p> و استمتع بجودة الطعم</p>
          </div>
          <div className="home-menu-link">
            <a style={{ textDecoration: "none" ,color: "white"}} href="#Menu">Explore menu</a>
          </div>
        </div>
        <div className="home-page-img">
          <Image
            src="/assets/IMG_1523.JPG"
            alt="home-page-img"
            width={600}
            height={400}
            priority
          />
        </div>
      </div>
    </div>
  );
}
