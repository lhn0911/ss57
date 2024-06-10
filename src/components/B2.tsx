import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  product_name: string;
  image: string;
  price: number;
  quantity: number;
  created_at: string;
}

const getAllProduct = async (): Promise<Product[]> => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default function B2() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProduct().then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.product_name}</h2>
            <img src={product.image} alt={product.product_name} />
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Added on: {new Date(product.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
