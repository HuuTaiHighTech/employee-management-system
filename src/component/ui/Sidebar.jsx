import React from 'react'
import { NavLink } from 'react-router-dom';
import IconHeader from './IconHeader';
const Sidebar = () => {
  const menuItems = [
    {
      to: 'dashboard',
      label: 'Bảng điều khiển',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      ),
    },
    {
      to: 'employees',
      label: 'Quản lý nhân viên',
      icon: <i className="fa-solid fa-people-group"></i>,
    },
  ];
  const renderNavs = () => {
    const arrNavs = menuItems.map((item) => {
      return (
        <li className="nav-item" key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `nav-link rounded-3 d-flex align-items-center gap-3 py-2 px-3${isActive ? ' active' : ''}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        </li>
      )
    })
    return arrNavs;
  }
  return (
    <aside
      className="d-flex flex-column flex-shrink-0 p-3 bg-white border-end vh-100 position-sticky top-0"
      style={{ width: '260px' }}
    >
      {/* 1. LOGO THƯƠNG HIỆU */}
      <a
        href="/"
        className="d-flex align-items-center gap-2 mb-3 text-dark text-decoration-none px-2"
      >
        <div
          className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
          style={{ width: '38px', height: '38px', fontSize: '16px' }}
        >
          <IconHeader />
        </div>
        <div>
          <h6 className="fw-bold mb-0 text-dark">TrendSol</h6>
          <small className="text-muted" style={{ fontSize: '11px' }}>HỆ THỐNG QUẢN TRỊ</small>
        </div>
      </a>
      <hr className="my-2 text-secondary-subtle" />
      {/* 2. DANH SÁCH MENU (BOOTSTRAP NAV-PILLS THUẦN TÚY) */}
      <ul className="nav flex-column mb-auto gap-1 py-2">
        {/* Mục 1: Bảng điều khiển */}
        {renderNavs()}
      </ul>
      <hr className="my-2 text-secondary-subtle" />
    </aside>
  )
}

export default Sidebar
