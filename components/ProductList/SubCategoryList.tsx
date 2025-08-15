import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string; // düzəliş
  rating: number;
  [key: string]: any;
}


interface SubCategoryProps {
  category: string; // main category
  onSubCategorySelect: (subCategory: string) => void;
}

const SubCategory: React.FC<SubCategoryProps> = ({
  category,
  onSubCategorySelect,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // API-dən məhsulların çəkilməsi
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Product[]>(
          "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Məhsullar çəkilərkən xəta baş verdi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Subcategory siyahısını hesablamaq
  const subCategories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .filter((p) =>
            category !== "all" ? p.category === category : true
          )
          .map((p) => p.subCategory)
      )
    );
  }, [products, category]);

  if (loading) {
    return <div>Yüklənir...</div>;
  }

  if (subCategories.length === 0) {
    return <div>Bu kateqoriyada alt kateqoriya yoxdur</div>;
  }

  return (
    <div className="subcategory-list">
      {subCategories.map((subCat) => (
        <button
          key={subCat}
          onClick={() => onSubCategorySelect(subCat)}
          className="subcategory-btn"
        >
          {subCat}
        </button>
      ))}
    </div>
  );
};

export default SubCategory;
