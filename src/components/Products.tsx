import React, { useState } from "react";

interface Product {
  id: number;
  product_name: string;
  images: string;
  price: number;
  quantity: number;
  created_at: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    product_name: "Áo Đen",
    images:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/364/712/products/021204.jpg?v=1635825038117",
    price: 100,
    quantity: 10,
    created_at: "01/06/2022",
  },
  {
    id: 3,
    product_name: "Quần Jean Nữ",
    images:
      "https://quanjeandep.com/images/thumbs/quan-jean-nam-co-dien-dang-dung-501-505s-11507.jpeg",
    price: 150,
    quantity: 10,
    created_at: "02/06/2022",
  },
  {
    id: 4,
    product_name: "Áo Picolo",
    images:
      "https://product.hstatic.net/1000357687/product/vnmese_boizartboard_7_854b35c9decd417da863acb67bc356af_master.jpg",
    price: 300,
    quantity: 10,
    created_at: "12/05/2022",
  },
  {
    id: 5,
    product_name: "Áo thun xanh",
    images: "https://dosi-in.com/images/detailed/42/CDL4_1.jpg",
    price: 250,
    quantity: 10,
    created_at: "13/04/2022",
  },
];

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
            name="images"
            value={editProduct.images}
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
              <td>
                <img
                  src={product.images}
                  alt={product.product_name}
                  style={{ width: "50px", height: "auto" }}
                />
              </td>
              <td>{product.price.toLocaleString()} đ</td>
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
