import React from 'react'
import { NavLink } from 'react-router-dom';
const navItems = [
  {
    id: 1,
    title: 'Dashboard',
    path: 'dashboard',
    icon: 'fa-solid fa-arrow-trend-up',
  },
  {
    id: 2,
    title: 'Quản lý nhân viên',
    path: 'employees',
    icon: 'fa-solid fa-people-line',
  },
  {
    id: 3,
    title: 'Tạo nhân viên',
    path: 'employees/create',
    icon: 'fa-solid fa-user-plus',
  },
  {
    id: 4,
    title: 'Chỉnh sửa nhân viên',
    path: 'employees/edit/:id',
    icon: 'fa-solid fa-user-pen',
  },
];
const Sidebar = () => {
  return (
    <aside className="bg-dark text-white min-vh-100 p-3 flex-shrink-0"
      style={{ width: '280px' }}>

      <h5 className="fw-bold mb-4">
        <i className="fa-solid fa-user-tie me-2"></i>
        Employee Admin
      </h5>

      <nav className="nav flex-column gap-2 d-flex align-items-start">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `nav-link text-white rounded p-3 ${
                isActive ? 'bg-primary' : ''
              }`
            }
          >
            <i className={`${item.icon} me-3`}></i>
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
