import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="admin">
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
