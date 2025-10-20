import React, { useEffect, useState } from "react";
import "../../styles/pages/AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  // ✅ Lấy danh sách users + trainers
  const fetchAllData = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không tìm thấy token đăng nhập!");

      const [usersRes, trainersRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/trainers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const usersData = await usersRes.json();
      const trainersData = await trainersRes.json();

      if (!usersRes.ok)
        throw new Error(usersData.message || "Không thể tải danh sách user");
      if (!trainersRes.ok)
        throw new Error(
          trainersData.message || "Không thể tải danh sách trainer"
        );

      setUsers(usersData.users || []);
      setTrainers(trainersData.trainers || []);
      setFiltered(usersData.users || []);
    } catch (err) {
      console.error("❌ Lỗi tải dữ liệu:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ✅ Tìm kiếm
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const list = activeTab === "users" ? users : trainers;
    setFiltered(
      list.filter(
        (item) =>
          item.username?.toLowerCase().includes(lower) ||
          item.email?.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm, activeTab, users, trainers]);

  // ✅ Lấy chi tiết user/trainer (gộp healthInfo)
  const fetchDetails = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không tìm thấy token!");

      const endpoint =
        activeTab === "trainers"
          ? `http://localhost:5000/api/admin/trainers/${id}`
          : `http://localhost:5000/api/admin/users/${id}`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Không thể tải chi tiết");

      // ✅ Gộp healthInfo vào user (nếu có)
      if (data.user && data.healthInfo) {
        data.user.height = data.healthInfo.height;
        data.user.weight = data.healthInfo.weight;
        data.user.bmi = data.healthInfo.bmi;
        data.user.bmiCategory = data.healthInfo.bmiCategory;
      }

      setSelected(data.trainer || data.user || null);
    } catch (err) {
      alert("❌ Lỗi tải chi tiết: " + err.message);
    }
  };

  const renderPrices = (prices) => {
    if (!prices) return "Chưa có thông tin";
    return Object.entries(prices)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  };

  if (loading)
    return <div className="admin-loading">⏳ Đang tải dữ liệu...</div>;
  if (error)
    return (
      <div className="admin-error">
        ❌ {error} <button onClick={fetchAllData}>Thử lại</button>
      </div>
    );

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">🛠️ Admin Dashboard</h1>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("users");
            setFiltered(users);
          }}
        >
          👥 Users
        </button>
        <button
          className={`admin-tab ${activeTab === "trainers" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("trainers");
            setFiltered(trainers);
          }}
        >
          🏋️ Trainers
        </button>
      </div>

      {/* Search */}
      <div className="admin-search">
        <input
          type="text"
          placeholder="🔍 Tìm theo email hoặc username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-input"
        />
        <button onClick={fetchAllData} className="admin-refresh-btn">
          🔄 Làm mới
        </button>
      </div>

      {/* Danh sách */}
      <div className="admin-list-container">
        {filtered.length === 0 ? (
          <p className="admin-empty">Không có dữ liệu để hiển thị.</p>
        ) : (
          <div className="admin-grid-cards">
            {filtered.map((item) => (
              <div
                key={item.id || item._id}
                className="admin-card"
                onClick={() => fetchDetails(item.id || item._id)}
              >
                <div className="admin-card-header">
                  <img
                    src={
                      item.image
                        ? item.image.startsWith("http")
                          ? item.image
                          : `http://localhost:5000${item.image}`
                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt={item.username}
                    className="admin-avatar"
                  />
                  <div>
                    <h3 className="admin-name">{item.username}</h3>
                    <p className="admin-role">
                      {item.role === "pt"
                        ? "🏋️ Personal Trainer"
                        : item.role === "admin"
                        ? "🧩 Administrator"
                        : "👤 User"}
                    </p>
                  </div>
                </div>

                <div className="admin-card-body">
                  <p>📧 {item.email}</p>
                  <p>📱 {item.phone || "Chưa có số"}</p>

                  {activeTab === "trainers" && (
                    <>
                      {item.specialty && <p>💪 {item.specialty}</p>}
                      {item.experience && <p>🎓 {item.experience} năm</p>}
                      {item.location && <p>📍 {item.location}</p>}
                      {item.prices && (
                        <p>💸 Gói tập: {renderPrices(item.prices)}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal chi tiết */}
      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {selected.username}{" "}
              <span className="role-badge">
                {selected.role === "pt"
                  ? "🏋️ Trainer"
                  : selected.role === "admin"
                  ? "🧩 Admin"
                  : "👤 User"}
              </span>
            </h2>

            <div className="modal-info">
              <h3>📄 Thông tin cá nhân</h3>
              <p>📧 {selected.email}</p>
              <p>📱 {selected.phone || "Chưa có số"}</p>
              {selected.dateOfBirth && (
                <p>
                  🎂{" "}
                  {new Date(selected.dateOfBirth).toLocaleDateString("vi-VN")}
                </p>
              )}
              <p>🕓 Tạo lúc: {new Date(selected.createdAt).toLocaleString()}</p>

              <h3>💎 Gói Premium</h3>
              {selected.isPremium ? (
                <p>
                  💠 Premium – còn {selected.premiumDaysLeft || 0} ngày (hết hạn{" "}
                  {new Date(selected.premiumExpiredAt).toLocaleDateString(
                    "vi-VN"
                  )}
                  )
                </p>
              ) : (
                <p>⚪ Gói thường</p>
              )}

              {/* ⚖️ Thông tin thể trạng */}
              {selected.height || selected.weight || selected.bmi ? (
                <>
                  <h3>⚖️ Thể trạng</h3>
                  <p>Chiều cao: {selected.height || "Chưa có"} cm</p>
                  <p>Cân nặng: {selected.weight || "Chưa có"} kg</p>
                  <p>BMI: {selected.bmi || "Chưa có"}</p>
                  <p>Phân loại: {selected.bmiCategory || "Chưa xác định"}</p>
                </>
              ) : null}

              {/* 🏋️ Dành riêng cho Trainer */}
              {selected.role === "pt" && (
                <>
                  <h3>🏋️ Thông tin huấn luyện viên</h3>
                  {selected.specialty && <p>💪 {selected.specialty}</p>}
                  {selected.experience && <p>🎓 {selected.experience} năm</p>}
                  {selected.location && <p>📍 {selected.location}</p>}
                  {selected.prices && <p>💸 {renderPrices(selected.prices)}</p>}
                </>
              )}
            </div>

            <button className="close-btn" onClick={() => setSelected(null)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
