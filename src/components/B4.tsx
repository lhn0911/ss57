import React from "react";

export default function B4() {
  const removeProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Deleted product:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  React.useEffect(() => {
    removeProductById(2);
  }, []);

  return <div></div>;
}
