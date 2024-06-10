import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  product_name: string;
  image: string;
  price: number;
  quantity: number;
  created_at: string;
}

export default function B3() {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getProductById = async (id: number): Promise<Product | string> => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data: Product = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return "Không tìm thấy bản ghi";
    }
  };

  useEffect(() => {
    const productId = 1;
    getProductById(productId).then((data) => {
      if (typeof data === "string") {
        setError(data);
        setProduct(null);
      } else {
        setProduct(data);
        setError(null);
      }
    });
  }, []);

  return (
    <div>
      <h1>Product Details</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        product && (
          <div>
            <h2>{product.product_name}</h2>
            <img src={product.image} alt={product.product_name} />
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Added on: {new Date(product.created_at).toLocaleDateString()}</p>
          </div>
        )
      )}
    </div>
  );
}
