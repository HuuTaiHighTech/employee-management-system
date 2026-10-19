import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./main.css";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/EmployeeList";
import CreateProduct from "./pages/CreateEmployee";
import EditProduct from "./pages/EditEmployee";
import Sidebar from "./component/ui/Sidebar";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import AdminTemplate from "./templates/AdminTemplate";
import CreateAndEdit from "./pages/CreateAndEdit";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="admin" element={<AdminTemplate/>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<EmployeeList />} />
        {/* <Route path="employees/create" element={<CreateEmployee />} />
        <Route path="employees/edit/:id" element={<EditEmployee />} /> */}
        <Route path="employee/:id?" element={<CreateAndEdit />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
