"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./admin.module.css";

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

export default function AdminPanel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState<"category" | "item">("item");
  const [editingItem, setEditingItem] = useState<{
    categoryIndex: number;
    itemIndex?: number;
  } | null>(null);

  const [itemFormData, setItemFormData] = useState<MenuItem>({
    name: "",
    type: "قطعة",
    price: "",
    size: "",
    description: "",
    productImage: "",
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    categoreyImage: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  // Refs for scrolling to forms
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch("/api/menu");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.filename;
  };

  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageName = itemFormData.productImage;

      if (imageFile) {
        imageName = await handleImageUpload(imageFile);
      }

      const payload = {
        ...itemFormData,
        productImage: imageName,
        type: "item",
        categoryIndex: selectedCategory,
        itemIndex: editingItem?.itemIndex,
      };

      const url = "/api/menu";
      const method = isEditing && editMode === "item" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchMenu();
        resetItemForm();
        alert(
          isEditing ? "Item updated successfully!" : "Item added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Error saving item");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageName = categoryFormData.categoreyImage;

      if (imageFile) {
        imageName = await handleImageUpload(imageFile);
      }

      const payload = {
        type: "category",
        name: categoryFormData.name,
        categoreyImage: imageName,
        categoryIndex: isEditing ? editingItem?.categoryIndex : undefined,
      };

      const url = "/api/menu";
      const method = isEditing && editMode === "category" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchMenu();
        resetCategoryForm();
        setShowCategoryForm(false);
        alert(
          isEditing
            ? "Category updated successfully!"
            : "Category added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error saving category");
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (categoryIndex: number, itemIndex: number) => {
    const item = categories[categoryIndex].items[itemIndex];
    setItemFormData({
      name: item.name || "",
      type: item.type || "قطعة",
      price: item.price || "",
      size: item.size || "",
      description: item.description || "",
      productImage: item.productImage || "",
    });
    setSelectedCategory(categoryIndex);
    setEditingItem({ categoryIndex, itemIndex });
    setIsEditing(true);
    setEditMode("item");
    setShowCategoryForm(false);
    setImageFile(null); // Clear any previously selected file

    // Scroll to form
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleEditCategory = (categoryIndex: number) => {
    const category = categories[categoryIndex];
    setCategoryFormData({
      name: category.name || "",
      categoreyImage: category.categoreyImage || "",
    });
    setEditingItem({ categoryIndex });
    setIsEditing(true);
    setEditMode("category");
    setShowCategoryForm(true);
    setImageFile(null); // Clear any previously selected file

    // Scroll to form
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleDeleteItem = async (categoryIndex: number, itemIndex: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `/api/menu?categoryIndex=${categoryIndex}&itemIndex=${itemIndex}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await fetchMenu();
        alert("Item deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };

  const handleDeleteCategory = async (categoryIndex: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? All items in this category will be deleted!"
      )
    )
      return;

    try {
      const response = await fetch(`/api/menu?categoryIndex=${categoryIndex}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchMenu();
        alert("Category deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category");
    }
  };

  const resetItemForm = () => {
    setItemFormData({
      name: "",
      type: "قطعة",
      price: "",
      size: "",
      description: "",
      productImage: "",
    });
    setImageFile(null);
    setIsEditing(false);
    setEditingItem(null);
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: "",
      categoreyImage: "",
    });
    setImageFile(null);
    setIsEditing(false);
    setEditingItem(null);
  };

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Admin Panel - إدارة القائمة</h1>

      <div className={styles.buttonGroup}>
        <button
          onClick={() => {
            setShowCategoryForm(false);
            resetItemForm();
          }}
          className={!showCategoryForm ? styles.activeTab : styles.tab}
        >
          Manage Items - إدارة العناصر
        </button>
        <button
          onClick={() => {
            setShowCategoryForm(true);
            resetCategoryForm();
          }}
          className={showCategoryForm ? styles.activeTab : styles.tab}
        >
          Manage Categories - إدارة الفئات
        </button>
      </div>

      {!showCategoryForm ? (
        // ITEM FORM
        <div ref={formSectionRef} className={styles.formSection}>
          <h2>
            {isEditing && editMode === "item"
              ? "Edit Item - تعديل عنصر"
              : "Add New Item - إضافة عنصر جديد"}
          </h2>
          <form onSubmit={handleItemSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Category - الفئة</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
                required
              >
                {categories.map((cat, index) => (
                  <option key={index} value={index}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Name - الاسم</label>
              <input
                type="text"
                value={itemFormData.name}
                onChange={(e) =>
                  setItemFormData({ ...itemFormData, name: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Type - النوع</label>
              <input
                type="text"
                value={itemFormData.type}
                onChange={(e) =>
                  setItemFormData({ ...itemFormData, type: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Price - السعر</label>
              <input
                type="text"
                value={itemFormData.price}
                onChange={(e) =>
                  setItemFormData({ ...itemFormData, price: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Size - الحجم</label>
              <input
                type="text"
                value={itemFormData.size}
                onChange={(e) =>
                  setItemFormData({ ...itemFormData, size: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Description - الوصف</label>
              <textarea
                value={itemFormData.description}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Image - الصورة</label>
              {itemFormData.productImage && (
                <div className={styles.imagePreview}>
                  <p className={styles.currentImage}>Current Image:</p>
                  <img
                    src={`/assets/images/items/${itemFormData.productImage}`}
                    alt="Current item"
                    className={styles.previewImage}
                  />
                  <p className={styles.imageName}>
                    {itemFormData.productImage}
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {imageFile && (
                <p className={styles.newImageIndicator}>
                  New image selected: {imageFile.name}
                </p>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading
                  ? "Saving..."
                  : isEditing && editMode === "item"
                  ? "Update - تحديث"
                  : "Add - إضافة"}
              </button>
              {isEditing && editMode === "item" && (
                <button
                  type="button"
                  onClick={resetItemForm}
                  className={styles.cancelBtn}
                >
                  Cancel - إلغاء
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        // CATEGORY FORM
        <div ref={formSectionRef} className={styles.formSection}>
          <h2>
            {isEditing && editMode === "category"
              ? "Edit Category - تعديل فئة"
              : "Add New Category - إضافة فئة جديدة"}
          </h2>
          <form onSubmit={handleCategorySubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Category Name - اسم الفئة</label>
              <input
                type="text"
                value={categoryFormData.name}
                onChange={(e) =>
                  setCategoryFormData({
                    ...categoryFormData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Category Image - صورة الفئة</label>
              {categoryFormData.categoreyImage && (
                <div className={styles.imagePreview}>
                  <p className={styles.currentImage}>Current Image:</p>
                  <img
                    src={`/assets/images/items/${categoryFormData.categoreyImage}`}
                    alt="Current category"
                    className={styles.previewImage}
                  />
                  <p className={styles.imageName}>
                    {categoryFormData.categoreyImage}
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {imageFile && (
                <p className={styles.newImageIndicator}>
                  New image selected: {imageFile.name}
                </p>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading
                  ? "Saving..."
                  : isEditing && editMode === "category"
                  ? "Update - تحديث"
                  : "Add - إضافة"}
              </button>
              {isEditing && editMode === "category" && (
                <button
                  type="button"
                  onClick={() => {
                    resetCategoryForm();
                  }}
                  className={styles.cancelBtn}
                >
                  Cancel - إلغاء
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* DISPLAY CATEGORIES AND ITEMS */}
      <div className={styles.itemsSection}>
        <h2>Categories & Items - الفئات والعناصر</h2>
        {categories.map((category, catIndex) => (
          <div key={catIndex} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              <div className={styles.categoryActions}>
                <button
                  onClick={() => handleEditCategory(catIndex)}
                  className={styles.editBtn}
                >
                  Edit Category
                </button>
                <button
                  onClick={() => handleDeleteCategory(catIndex)}
                  className={styles.deleteBtn}
                >
                  Delete Category
                </button>
              </div>
            </div>
            <div className={styles.itemsGrid}>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.itemCard}>
                  <div className={styles.itemInfo}>
                    <h4>{item.name}</h4>
                    <p>Price: {item.price} ل.ل</p>
                    <p>Type: {item.type}</p>
                    {item.size && <p>Size: {item.size}</p>}
                    <p className={styles.description}>{item.description}</p>
                  </div>
                  <div className={styles.itemActions}>
                    <button
                      onClick={() => handleEditItem(catIndex, itemIndex)}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(catIndex, itemIndex)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
