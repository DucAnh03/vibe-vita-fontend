import React from "react";
import "../styles/layouts/__header.css";
import authLogo from "../assets/auth.jpg";
import { NavLink } from "react-router-dom";

const Header = () => {
  const headerItems = [
    { id: 1, name: "GỢI Ý", path: "/suggest" },
    { id: 2, name: "QUẢN LÝ SỨC KHỎE", path: "/health" },
    { id: 3, name: "LIST PHÒNG TẬP", path: "/" },
    { id: 4, name: "DANH SÁCH PT", path: "/" },
    { id: 5, name: "VỀ CHÚNG TÔI", path: "/" },
  ];

  return (
    <div className="app_header">
      <div className="app_header_container">
        {/* Logo */}
        <NavLink to={"/"} className="header_logo">
          <img src={authLogo} alt="VibeVita Logo" className="logo_image" />
          <span className="logo_text">VibeVita</span>
        </NavLink>

        {/* Navigation Menu */}
        <div className="header_navigation">
          {headerItems.map((item) => (
            <NavLink key={item.id} to={item.path} className="nav_item">
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="header_divider"></div>
    </div>
  );
};

export default Header;
