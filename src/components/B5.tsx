import React from "react";

export default function B5() {
  const createProduct = async () => {
    const newProduct = {
      name: "Product 4",
    };

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Created product:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  React.useEffect(() => {
    createProduct();
  }, []);

  return <div></div>;
}
