"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Cart.module.css";

interface MenuItem {
  name: string;
  type: string;
  price: string;
  size: string;
  description: string;
  productImage: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (itemName: string, quantity: number) => void;
  onRemoveItem: (itemName: string) => void;
  onClearCart: () => void;
}

export default function Cart({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [addressFocused, setAddressFocused] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/,/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US");
  };

  const handleCheckout = () => {
    const trimmedAddress = address.trim();
    if (!trimmedAddress) {
      // Prevent checkout if address is empty
      return;
    }
    const total = calculateTotal();
    const orderDetails = cart
      .map(
        (item) =>
          `• ${item.name} (${item.quantity}x) - ${
            item.price
          }ل.ل = ${formatPrice(
            parseFloat(item.price.replace(/,/g, "")) * item.quantity
          )}ل.ل`
      )
      .join("\n");

    const message = `مرحبا، أريد طلب:\n\n${orderDetails}\n\nالعنوان: ${trimmedAddress}\n\n*المجموع الكلي: ${formatPrice(
      total
    )}ل.ل*`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=96171942435&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose}></div>

      {/* Cart Sidebar */}
      <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ""}`}>
        {/* Header */}
        <div className={styles.cartHeader}>
          <h2>سلة الطلبات</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <Image
              src="/assets/x-icon.svg"
              alt="close"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Cart Items */}
        <div className={styles.cartContent}>
          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>السلة فارغة</p>
            </div>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={`${item.name}-${index}`} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    {item.productImage && (
                      <Image
                        src={`/assets/images/items/${item.productImage}`}
                        alt={item.name}
                        width={80}
                        height={80}
                      />
                    )}
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p className={styles.itemPrice}>{item.price}ل.ل</p>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.name, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.name, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => onRemoveItem(item.name)}
                  >
                    <Image
                      src="/assets/cancel.svg"
                      alt="remove"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.totalSection}>
              <span>المجموع الكلي:</span>
              <span className={styles.totalPrice}>
                {formatPrice(calculateTotal())}ل.ل
              </span>
            </div>
            <div style={{ width: "100%", marginTop: 8 }}>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="اكتب العنوان هنا (العنوان مطلوب)"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: `1px solid ${addressFocused ? "#10b981" : "#e5e7eb"}`,
                  background: "#f9fafb",
                  borderRadius: 10,
                  marginBottom: 10,
                  direction: "rtl",
                  outline: "none",
                  transition: "border-color .2s ease, box-shadow .2s ease",
                  boxShadow: addressFocused
                    ? "0 0 0 4px rgba(16,185,129,0.15)"
                    : "none",
                }}
                onFocus={() => setAddressFocused(true)}
                onBlur={() => setAddressFocused(false)}
              />
            </div>
            <button
              className={styles.checkoutBtn}
              onClick={handleCheckout}
              disabled={!address.trim()}
              style={{
                opacity: address.trim() ? 1 : 0.6,
                cursor: address.trim() ? "pointer" : "not-allowed",
              }}
            >
              إرسال الطلب عبر واتساب
            </button>
            <button className={styles.clearBtn} onClick={onClearCart}>
              مسح السلة
            </button>
          </div>
        )}
      </div>
    </>
  );
}
