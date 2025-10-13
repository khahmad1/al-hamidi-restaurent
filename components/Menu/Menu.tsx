"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";

interface MenuItem {
  name: string;
  type: string;
  price: string;
  size: string;
  description: string;
  productImage: string;
}

interface Category {
  name: string;
  categoreyImage: string;
  items: MenuItem[];
}

export default function Menu() {
  const [items, setItemsData] = useState<MenuItem[]>([]);
  const [categories, setCategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("/api/menu");
        const data = await response.json();
        setCategoriesData(data);
        setItemsData(data[0]?.items || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const getItems = useCallback(
    (categoryName: string) => {
      setLoading(true);
      const category =
        categories.find((cat) => cat.name === categoryName) || categories[0];
      setItemsData(category?.items || []);
      setLoading(false);
    },
    [categories]
  );

  const Categories = useMemo(
    () =>
      categories.map((elem) => (
        <button
          key={elem.name}
          className="category-card"
          onClick={() => {
            getItems(elem.name);
          }}
        >
          {elem.categoreyImage && (
            <Image
              src={`/assets/images/items/${elem.categoreyImage}`}
              alt={elem.name}
              width={30}
              height={30}
            />
          )}
          <p className="category-name">{elem.name}</p>
        </button>
      )),
    [categories, getItems]
  );

  const Items = useMemo(
    () =>
      items.map((elem, index) => (
        <div className="item-card" key={`${elem.name}-${index}`}>
          <div className="item-image">
            {elem.productImage && (
              <Image
                src={`/assets/images/items/${elem.productImage}`}
                alt={elem.name}
                width={300}
                height={200}
              />
            )}
            <div className="img-overlay"></div>
          </div>
          <div className="item-content">
            <div className="title-wrapper">
              <p className="name">{elem.name}</p>
              <p className="line-separator"></p>
              <p className="price">{elem.price}ل.ل</p>
            </div>
            <div className="discreption">
              {elem.type} , {elem.description}
            </div>
          </div>
        </div>
      )),
    [items]
  );

  const loader = (
    <div style={{ margin: "40px auto", width: "fit-content" }}>
      <div className="loader">Loading...</div>
    </div>
  );

  return (
    <div className="home-menue" id="Menu">
      <div className="container">
        <div className="special-sections">
          <p>SPECIAL SELECTION</p>
          <Image
            src="/assets/separator.svg"
            alt="separator"
            width={100}
            height={20}
          />
        </div>
        <div className="section-name">
          <h2 className="headline-1 section-title text-center">
            Delicious Menu
          </h2>
        </div>
        <div className="categories-slider">{Categories}</div>
        {loading ? loader : <div className="menue-items">{Items}</div>}
        <Image
          src="/assets/shape-5.png"
          width={921}
          height={1036}
          loading="lazy"
          alt="shape"
          className="shape shape-2 move-anim"
        />
        <Image
          src="/assets/shape-6.png"
          width={921}
          height={1036}
          loading="lazy"
          alt="shape"
          className="shape shape-3 move-anim"
        />
      </div>
    </div>
  );
}
