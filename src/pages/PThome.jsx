import React, { useState, useEffect, useRef } from "react";
import "../styles/pages/__home.css";
import "../styles/pages/__pthome.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AIChatBox from "../components/AIChatBox";

const PThome = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
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

  const ptUtilities = [
    {
      id: 1,
      title: "QUẢN LÝ HỌC VIÊN",
      image: "/src/assets/images/utilites1.png",
    },
    { id: 2, title: "LỊCH DẠY", image: "/src/assets/images/utilities2.png" },
    {
      id: 3,
      title: "THỐNG KÊ DOANH THU",
      image: "/src/assets/images/utilities3.png",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      studentName: "Nguyễn Văn A",
      time: "09:00 - 10:00",
      date: "2024-01-15",
    },
    {
      id: 2,
      studentName: "Trần Thị B",
      time: "14:00 - 15:00",
      date: "2024-01-15",
    },
    {
      id: 3,
      studentName: "Lê Văn C",
      time: "16:00 - 17:00",
      date: "2024-01-15",
    },
  ];

  return (
    <div className="pt_home d-flex flex-column">
      <div className="app_home_container">
        {/* Banner */}
        <div className="pt_banner">
          {/* User Info */}
          {isAuthenticated && (
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
          )}

          {/* Banner main */}
          <div className="wrapper_banner d-flex align-items-center justify-content-between gap-3">
            <div className="banner_overlay"></div>
            <div className="banner_content w-100 h-100 d-flex flex-column align-items-start justify-content-center">
              <h2 className="d-flex flex-column align-items-start gap-2">
                <span className="highlight-red">WELCOME</span>
                <span className="highlight">PERSONAL TRAINER</span>
              </h2>
              <h2 className="d-flex align-items-center gap-2">
                <span className="highlight">MANAGE YOUR</span>
                <span className="highlight-bold">STUDENTS</span>
              </h2>
              <p>
                Quản lý học viên, lịch dạy và theo dõi tiến độ của từng học viên
                một cách hiệu quả. Tạo ra những chương trình tập luyện phù hợp
                với từng cá nhân.
              </p>
              <button
                className="btn_guide"
                onClick={() => navigate("/list-trainers")}
              >
                QUẢN LÝ HỌC VIÊN
              </button>
            </div>
            <div className="banner_image_wrapper">
              <img
                src="/src/assets/images/Mask group.png"
                alt="Banner chính"
                className="banner_main"
              />
            </div>
          </div>
        </div>

        {/* PT Tools */}
        <div className="pt_utilities">
          <h2 className="pt_utilities_title">CÔNG CỤ PT</h2>
          <ul className="pt_utilities_list">
            {ptUtilities.map((item) => (
              <li key={item.id} className="pt_utilities_item">
                <h3>{item.title}</h3>
                <p>Quản lý và theo dõi hiệu quả</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Bookings */}
        <div className="booking_section">
          <h2 className="booking_title">LỊCH DẠY HÔM NAY</h2>
          <p className="eat_today_desc">
            Xem lịch dạy và thông tin học viên trong ngày hôm nay.
          </p>

          <ul className="booking_list">
            {recentBookings.map((booking) => (
              <li key={booking.id} className="booking_item">
                <div className="booking_info">
                  <h4>{booking.studentName}</h4>
                  <p>Thời gian: {booking.time}</p>
                  <p>Ngày: {booking.date}</p>
                </div>
                <div className="booking_stats">
                  <span>📅 {booking.time}</span>
                  <span>👤 {booking.studentName}</span>
                </div>
                <button className="btn_pt_secondary">XEM CHI TIẾT</button>
              </li>
            ))}
          </ul>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button className="btn_pt_primary">XEM TẤT CẢ LỊCH DẠY</button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="pt_stats">
          <div className="container">
            <h2 className="booking_title" style={{ color: "white" }}>
              THỐNG KÊ HOẠT ĐỘNG
            </h2>
            <div className="pt_stats_cards">
              <div className="pt_stats_card">
                <h3>HỌC VIÊN HOẠT ĐỘNG</h3>
                <ul>
                  <li>Tổng học viên: 25</li>
                  <li>Học viên mới: 3</li>
                  <li>Học viên VIP: 8</li>
                  <li>Đánh giá trung bình: 4.8/5</li>
                </ul>
                <span className="pt_stats_price">25</span>
              </div>

              <div className="pt_stats_card">
                <h3>DOANH THU THÁNG</h3>
                <ul>
                  <li>Tháng này: 15,000,000 VNĐ</li>
                  <li>So với tháng trước: +12%</li>
                  <li>Lịch dạy: 45 buổi</li>
                  <li>Tỷ lệ hoàn thành: 98%</li>
                </ul>
                <span className="pt_stats_price">15M</span>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button className="btn_pt_primary">XEM BÁO CÁO CHI TIẾT</button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chatbox */}
      <AIChatBox />
    </div>
  );
};

export default PThome;
