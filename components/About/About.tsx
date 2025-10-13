import React from "react";

export default function AboutUs() {
  return (
    <div className="container about-us-container" id="AboutUs">
      <div className="about-us-text-container">
        <div className="special-sections">
          <p>About Us</p>
        </div>
        <p className="about-us-text">
          زبائننا الكرام لطالما عودتكم سلسلة معجنات الحميدي على تقديم أجود أنواع
          المعجنات، والتي تعتمد فيها معايير عالية من الجودة في الإنتاج واستخدام
          المواد الأولية في السلامة الغذائية. وفي فرعنا الجديد / في شارع نقابة
          الأطباء نقدم بالإضافة للمعجنات أصنافا من السواريه والكرواسان
          والكعك،وقد اقتصرنا على هذه الأصناف لنبدع فيها ونتميز، وبالتالي نضع بين
          يدي زبائننا الكرام أطيب لقمة. ونعلن عن استعدادنا لتلبية طلباتكم في
          مختلف المناسبات على الرقم التالي: 71942435 على أن يكون الطلب قبل 24
          ساعة يسعدنا تشريفكم، وتسرنا خدمتكم من الساعة ٦ صباحا حتى ٤ عصرا
        </p>
      </div>
      <div className="about-us-iamges">
        <div className="firstImage">
          <img
            src="/assets/IMG_1515.JPG"
            alt="about-us-iamges"
            className="about-us-iamge"
          />
          <p className="since-date">
            Since 1999
            <img className="badge2" alt="badge2" src="/assets/badge-2-bg.png" />
          </p>
        </div>
        <div className="secondImage">
          <img
            src="/assets/IMG_1532.JPG"
            alt="about-us-iamges"
            className="about-us-iamge"
          />
          <img
            src="/assets/img-pattern.svg"
            className="imagepattern"
            alt="pattern"
          />
        </div>
      </div>
      <img src="/assets/shape-1.png" className="shape1-image" alt="shape" />
      <img src="/assets/shape-2.png" className="shape2-image" alt="shape" />
    </div>
  );
}
