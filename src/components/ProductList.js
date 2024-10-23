import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../redux/Productslice";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <h2>Danh Sách Hàng Hóa</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <SearchBar onSearch={setSearchQuery} />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => navigate("/add-product")}
        >
          Thêm Hàng Hóa
        </button>
      </div>

      {currentProducts.length > 0 ? (
        currentProducts.map((product) => (
          <div key={product.id} className="product-item">
            <span>
              {product.name} - {product.price} VND
            </span>
            <div>
              <button onClick={() => dispatch(deleteProduct(product.id))}>
                Xóa
              </button>
              <Link to={`/edit-product/${product.id}`}>
                <button className="edit-btn">Chỉnh sửa</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>Không tìm thấy hàng hóa nào!</p>
      )}

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Trang trước
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default ProductList;
