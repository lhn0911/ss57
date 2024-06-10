import React, { useState } from "react";

interface Product {
  id: number;
  product_name: string;
  image: string;
  price: number;
  quantity: number;
  created_at: string;
}

export default function ListProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProduct((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "price" || name === "quantity" ? Number(value) : value,
          }
        : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editProduct) {
      setProducts(
        products.map((p) => (p.id === editProduct.id ? editProduct : p))
      );
      setEditProduct(null);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditProduct({ ...product });
  };

  const handleDeleteClick = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container">
      <h1>Quản lý sản phẩm</h1>

      {editProduct && (
        <form className="d-flex flex-column my-3" onSubmit={handleSubmit}>
          <h2>Cập nhật sản phẩm</h2>
          <label>Tên sản phẩm</label>
          <input
            name="product_name"
            value={editProduct.product_name}
            onChange={handleChange}
            type="text"
          />
          <label>Ảnh</label>
          <input
            name="image"
            value={editProduct.image}
            onChange={handleChange}
            type="text"
          />
          <label>Giá tiền</label>
          <input
            name="price"
            value={editProduct.price}
            onChange={handleChange}
            type="number"
          />
          <label>Số lượng</label>
          <input
            name="quantity"
            value={editProduct.quantity}
            onChange={handleChange}
            type="number"
          />
          <button type="submit">Cập nhật</button>
          <button type="button" onClick={() => setEditProduct(null)}>
            Hủy
          </button>
        </form>
      )}

      <table className="table table-hover table-bordered text-center">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Ảnh</th>
            <th>Giá tiền</th>
            <th>Số lượng</th>
            <th>Ngày thêm</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.product_name}</td>
              <td>{product.image}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.created_at}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditClick(product)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
