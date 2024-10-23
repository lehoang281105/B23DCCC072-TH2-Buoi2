import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import ProductPage from "./page/ProductPage";
import AddProductPage from "./page/AddProductPage";
import EditProductPage from "./page/EditProductPage";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <div className="sidebar">
            <div>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Quản lý hàng hóa
              </NavLink>
            </div>
          </div>

          <div className="main-content">
            <Routes>
              <Route path="/products" element={<ProductPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/edit-product/:id" element={<EditProductPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
