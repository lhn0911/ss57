import React, { useState, useEffect } from "react";

export default function B1() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
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
