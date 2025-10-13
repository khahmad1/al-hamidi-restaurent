"use client";

import Image from "next/image";

export default function Location() {
  return (
    <div className="location-section" id="Location">
      <div>
        <div className="special-sections">
          <p>Location & Contact</p>
          <Image
            src="/assets/separator.svg"
            alt="separator"
            width={100}
            height={20}
          />
        </div>
        <div className="location-description">
          <div className="location-description-topics oppening-time">
            <div className="location-description-topics-header">
              <Image
                src="/assets/clock-icon.svg"
                alt="clock-icon"
                width={25}
                height={25}
              />
              <p>Opening Time</p>
            </div>
            <span>8.00 am to 5.00 pm</span>
          </div>
          <div className="location-description-topics location-text">
            <div className="location-description-topics-header">
              <Image
                src="/assets/location-logo.svg"
                alt="location"
                width={25}
                height={25}
              />
              <p>Location</p>
            </div>
            <span>Tripoli - Nakabet Al Ateba - Nearby by Howa-chicken</span>
          </div>
          <div className="location-description-topics phone-number">
            <div className="location-description-topics-header">
              <Image
                src="/assets/phone-icon.svg"
                alt="phone"
                width={25}
                height={25}
              />
              <p>Phone Number</p>
            </div>
            <span>
              <a
                href="https://api.whatsapp.com/send?phone=71942435"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" ,color: "white"}}
              >
                +961 71942435
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d205.64049772536922!2d35.82721731348078!3d34.445852932310046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slb!4v1760346435021!5m2!1sen!2slb"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
