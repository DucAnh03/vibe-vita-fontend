import React, { useState, useEffect, useRef } from "react";
import "../styles/pages/__home.css";
import logoDangNhap from "../assets/icons/Dangnhap.png";
import logoDangKi from "../assets/icons/Dangki.png";
import imagehome from "../assets/images/Mask group.png";
import utilities1 from "../assets/images/utilites1.png";
import utilities2 from "../assets/images/utilities2.png";
import utilities3 from "../assets/images/utilities3.png";
import eatTodayImage from "../assets/images/eat-today.png";
import homevip from "../assets/images/home_vip.png";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AIChatBox from "../components/AIChatBox";

const Home = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // 🔹 Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔹 Cập nhật: thêm đường dẫn cho từng tiện ích
  const utilities = [
    { id: 1, title: "PT LISTS", image: utilities1, path: "/list-trainers" },
    {
      id: 2,
      title: "QUẢN LÝ SỨC KHỎE",
      image: utilities2,
      path: "/health",
    },
    {
      id: 3,
      title: "GỢI Ý THỰC ĐƠN",
      image: utilities3,
      path: "/suggest",
    },
  ];

  const eatToday = [
    { id: 1, image: eatTodayImage },
    { id: 2, image: eatTodayImage },
    { id: 3, image: eatTodayImage },
    { id: 4, image: eatTodayImage },
  ];

  return (
    <div className="app_home d-flex flex-column">
      <div className="app_home_container">
        {/* Banner */}
        <div className="app_home_banner">
          {/* Auth Buttons or User Info */}
          {isAuthenticated ? (
            <div className="wrapper_user_info d-inline-flex p-2">
              <div className="user_info_container" ref={dropdownRef}>
                <div
                  className="user_info"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <div className="user_avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="user_name">
                    {user?.username || user?.email}
                  </span>
                  <svg
                    className={`dropdown_arrow ${
                      showUserDropdown ? "rotated" : ""
                    }`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {showUserDropdown && (
                  <div className="user_dropdown">
                    {/* Profile */}
                    <button
                      className="dropdown_item profile_item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserDropdown(false);
                        navigate("/profile");
                      }}
                    >
                      <span>Profile</span>
                    </button>

                    {/* UserBookings */}
                    <button
                      className="dropdown_item bookings_item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserDropdown(false);
                        navigate("/my-bookings");
                      }}
                    >
                      <span>Lịch sử Booking</span>
                    </button>

                    {/* Logout */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserDropdown(false);
                        logout();
                      }}
                      className="dropdown_item logout_item"
                    >
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="wrapper_btn_sign_in_up d-inline-flex p-2">
              <NavLink to="/login">
                <img src={logoDangNhap} alt="..." />
                <span>Đăng Nhập</span>
              </NavLink>
              <NavLink to="/signup">
                <img src={logoDangKi} alt="..." />
                <span>Đăng Kí</span>
              </NavLink>
            </div>
          )}

          {/* Banner main */}
          <div className="wrapper_banner d-flex align-items-center justify-content-between gap-3">
            <div className="banner_overlay"></div>
            <div className="banner_content w-100 h-100 d-flex flex-column align-items-start justify-content-center">
              <h2 className="d-flex flex-column align-items-start gap-2">
                <span className="highlight-red">BUILD</span>
                <span className="highlight">YOUR BODY</span>
              </h2>
              <h2 className="d-flex align-items-center gap-2">
                <span className="highlight">MORE</span>
                <span className="highlight-bold">STRONG</span>
              </h2>
              <p>
                Khám phá nhiều ý tưởng bữa ăn lành mạnh được thiết kế để hỗ trợ
                mục tiêu thể dục và sức khỏe của bạn, dù bạn đang muốn giảm cân
                hay tăng cân.
              </p>
              <button
                className="btn_guide"
                onClick={() => navigate("/suggest")}
              >
                XEM GỢI Ý
              </button>
            </div>
            <div className="banner_image_wrapper">
              <img src={imagehome} alt="Banner chính" className="banner_main" />
            </div>
          </div>
        </div>

        {/* 🔹 Tiện ích */}
        <div className="app_home_convenient">
          <h2 className="utilities_title fs-1">CÔNG CỤ</h2>
          <ul className="utilities_list">
            {utilities.map((item) => (
              <li
                key={item.id}
                className="utilities_item"
                onClick={() => navigate(item.path)}
                style={{ cursor: "pointer" }}
              >
                <img src={item.image} alt={item.title} />
                <div className="utilities_overlay">
                  <span className="fs-5">{item.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* VIP */}
        <div className="app_home_vip">
          <div className="vip_left">
            <img src={homevip} alt="VIP Training" className="vip_image" />
          </div>
          <div className="vip_right">
            <div className="vip_cards">
              <div
                className="vip_card"
                onClick={() => navigate("/vip1")}
                style={{ cursor: "pointer" }}
              >
                <h3>VIP 1</h3>
                <ul>
                  <li>Nội dung 1</li>
                  <li>Nội dung 2</li>
                  <li>Nội dung 3</li>
                  <li>Nội dung 4</li>
                  <li>Nội dung 5</li>
                </ul>
                <span className="vip_price">$12</span>
              </div>
              <div
                className="vip_card"
                onClick={() => navigate("/vip2")}
                style={{ cursor: "pointer" }}
              >
                <h3>VIP 2</h3>
                <ul>
                  <li>Nội dung 1</li>
                  <li>Nội dung 2</li>
                  <li>Nội dung 3</li>
                  <li>Nội dung 4</li>
                  <li>Nội dung 5</li>
                </ul>
                <span className="vip_price">$20</span>
              </div>
            </div>
            <button className="vip_btn">TÌM HIỂU THÊM</button>
          </div>
        </div>

        {/* Eat today */}
        <div className="app_home_eat_today">
          <h2 className="eat_today_title">HÔM NAY BẠN ĂN GÌ?</h2>
          <p className="eat_today_desc">
            Mỗi ngày, bạn sẽ nhận được thực đơn được thiết kế riêng theo chỉ số
            cơ thể, mục tiêu luyện tập và mức độ hoạt động.
          </p>

          <ul className="eat_today_list">
            {eatToday.map((item) => (
              <li key={item.id} className="eat_today_item">
                <img src={item.image} alt={`meal-${item.id}`} />
                <div className="eat_today_info">
                  <div className="eat_today_stats">
                    <span>❤️ 350</span>
                    <span>💬 134</span>
                  </div>
                  <button className="btn_details">MORE DETAILS</button>
                </div>
              </li>
            ))}
          </ul>

          <button className="btn_view_more">XEM THÊM THỰC ĐƠN</button>
        </div>
      </div>

      {/* AI Chatbox */}
      <AIChatBox />
    </div>
  );
};

export default Home;
