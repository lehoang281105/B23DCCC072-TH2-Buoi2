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
  const [sortOrder, setSortOrder] = useState("default"); // Thêm trạng thái để sắp xếp
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (e) => {
    setSortOrder(e.target.value); // Cập nhật thứ tự sắp xếp
  };

  // Lọc và sắp xếp sản phẩm dựa trên từ khóa tìm kiếm và thứ tự sắp xếp
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sắp xếp sản phẩm theo giá
    if (sortOrder === "lowToHigh") {
      return filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      return filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [products, searchQuery, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredAndSortedProducts, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <h2>Danh Sách Sản Phẩm</h2>

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
          Thêm Sản Phẩm
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Sắp xếp theo: </label>
        <select onChange={handleSort} value={sortOrder}>
          <option value="default">Mặc định</option>
          <option value="lowToHigh">Giá: Thấp đến Cao</option>
          <option value="highToLow">Giá: Cao đến Thấp</option>
        </select>
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
                <button className="edit-btn">Sửa</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>Không tìm thấy gì!</p>
      )}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default ProductList;
