"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Cart from "@/components/Menu/Cart";

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

interface CartItem extends MenuItem {
  quantity: number;
}

export default function Menu() {
  const [items, setItemsData] = useState<MenuItem[]>([]);
  const [categories, setCategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (
    message: string,
    type: "success" | "info" | "error" = "info"
  ) => {
    setToast({ message, type });
    setToastVisible(true);
    window.clearTimeout((showToast as any)._t);
    (showToast as any)._t = window.setTimeout(
      () => setToastVisible(false),
      2200
    );
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

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

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      showToast(`تمت زيادة كمية ${item.name} في السلة`, "success");
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      showToast(`تمت إضافة ${item.name} إلى السلة`, "success");
    }
  };

  const removeFromCart = (itemName: string) => {
    setCart(cart.filter((item) => item.name !== itemName));
    showToast(`تمت إزالة ${itemName} من السلة`, "info");
  };

  const updateQuantity = (itemName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemName);
    } else {
      setCart(
        cart.map((item) =>
          item.name === itemName ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

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
            <button className="add-to-cart-btn" onClick={() => addToCart(elem)}>
              اضافة للسلة
            </button>
          </div>
        </div>
      )),
    [items, cart]
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

      {/* Cart Floating Button */}
      {cart.length > 0 && (
        <button
          className="cart-floating-btn"
          onClick={() => setIsCartOpen(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z"
              fill="currentColor"
            />
          </svg>
          <span className="cart-badge">{getTotalItems()}</span>
        </button>
      )}

      {/* Cart Component */}
      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 10000,
            transition: "transform 0.25s ease, opacity 0.25s ease",
            transform: toastVisible ? "translateY(0)" : "translateY(10px)",
            opacity: toastVisible ? 1 : 0,
          }}
        >
          <div
            role="status"
            style={{
              background:
                toast.type === "error"
                  ? "#ef4444"
                  : toast.type === "success"
                  ? "#10b981"
                  : "#3b82f6",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: 8,
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              direction: "rtl",
              fontSize: 14,
              maxWidth: 320,
            }}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
