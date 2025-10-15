// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import "../styles/pages/__pthome.css";

// // Fake data
// const students = [
//   { id: 1, name: "Nguyễn Văn A", progress: "70%", status: "Đang hoạt động" },
//   { id: 2, name: "Trần Thị B", progress: "45%", status: "Nghỉ tạm thời" },
//   { id: 3, name: "Lê Văn C", progress: "90%", status: "VIP" },
// ];

// const bookings = [
//   { id: 1, student: "Nguyễn Văn A", date: "2024-09-15", time: "09:00 - 10:00" },
//   { id: 2, student: "Trần Thị B", date: "2024-09-15", time: "14:00 - 15:00" },
//   { id: 3, student: "Lê Văn C", date: "2024-09-16", time: "16:00 - 17:00" },
// ];

// const PThome = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile");

//   return (
//     <div className="pt_dashboard">
//       {/* Sidebar */}
//       <aside className="pt_sidebar">
//         <h2>Trainer Panel</h2>
//         <ul>
//           <li onClick={() => navigate("/pt-profile")}>👤 Thông tin cá nhân</li>
//           <li onClick={() => setActiveTab("bookings")}>📅 Lịch sử đặt lịch</li>
//           <li onClick={() => setActiveTab("students")}>👥 Quản lý học viên</li>
//           <li className="logout" onClick={logout}>
//             🚪 Đăng xuất
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="pt_content">
//         {/* Profile */}
//         {activeTab === "profile" && (
//           <div className="pt_tab">
//             <h2>Thông tin cá nhân</h2>
//             <form className="profile_form">
//               <div className="form_group">
//                 <label>Tên hiển thị</label>
//                 <input type="text" defaultValue={user?.username || ""} />
//               </div>
//               <div className="form_group">
//                 <label>Email</label>
//                 <input type="email" defaultValue={user?.email || ""} />
//               </div>
//               <div className="form_group">
//                 <label>Số điện thoại</label>
//                 <input type="text" placeholder="Nhập số điện thoại" />
//               </div>
//               <div className="form_group">
//                 <label>Ngày sinh</label>
//                 <input type="date" />
//               </div>
//               <button className="btn_pt_primary">Cập nhật</button>
//             </form>
//           </div>
//         )}

//         {/* Bookings */}
//         {activeTab === "bookings" && (
//           <div className="pt_tab">
//             <h2>Lịch sử đặt lịch</h2>
//             <table className="pt_table">
//               <thead>
//                 <tr>
//                   <th>Học viên</th>
//                   <th>Ngày</th>
//                   <th>Thời gian</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map((b) => (
//                   <tr key={b.id}>
//                     <td>{b.student}</td>
//                     <td>{b.date}</td>
//                     <td>{b.time}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Students */}
//         {activeTab === "students" && (
//           <div className="pt_tab">
//             <h2>Quản lý học viên</h2>
//             <table className="pt_table">
//               <thead>
//                 <tr>
//                   <th>Tên học viên</th>
//                   <th>Tiến độ</th>
//                   <th>Trạng thái</th>
//                   <th>Hành động</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((s) => (
//                   <tr key={s.id}>
//                     <td>{s.name}</td>
//                     <td>{s.progress}</td>
//                     <td>{s.status}</td>
//                     <td>
//                       <button className="btn_pt_secondary">Chi tiết</button>
//                       <button className="btn_pt_primary">Cập nhật</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button
//               className="btn_pt_primary"
//               style={{ marginTop: "1rem" }}
//               onClick={() => navigate("/update")}
//             >
//               + Thêm học viên
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default PThome;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/pages/__pthome.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const PThome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [students, setStudents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // 🔹 Lấy danh sách học viên và lịch đặt từ backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Lấy danh sách học viên của PT
        const resStudents = await fetch(`${API_URL}/api/trainer/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataStudents = await resStudents.json();

        // 2️⃣ Lấy lịch đặt buổi tập
        const resBookings = await fetch(`${API_URL}/api/trainer/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataBookings = await resBookings.json();

        if (resStudents.ok) setStudents(dataStudents?.data || []);
        if (resBookings.ok) setBookings(dataBookings?.data || []);
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu PT:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id && token) fetchData();
  }, [user, token]);

  if (loading)
    return (
      <div className="pt_dashboard_loading">
        <div className="spinner" /> Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="pt_dashboard">
      {/* Sidebar */}
      <aside className="pt_sidebar">
        <h2>Trainer Panel</h2>
        <ul>
          <li onClick={() => setActiveTab("profile")}>👤 Thông tin cá nhân</li>
          <li onClick={() => setActiveTab("bookings")}>📅 Lịch sử đặt lịch</li>
          <li onClick={() => setActiveTab("students")}>👥 Quản lý học viên</li>
          <li className="logout" onClick={logout}>
            🚪 Đăng xuất
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="pt_content">
        {/* Profile */}
        {activeTab === "profile" && (
          <div className="pt_tab">
            <h2>Thông tin cá nhân</h2>
            <form className="profile_form">
              <div className="form_group">
                <label>Tên hiển thị</label>
                <input type="text" defaultValue={user?.username || ""} />
              </div>
              <div className="form_group">
                <label>Email</label>
                <input type="email" defaultValue={user?.email || ""} />
              </div>
              <div className="form_group">
                <label>Số điện thoại</label>
                <input type="text" placeholder="Nhập số điện thoại" />
              </div>
              <div className="form_group">
                <label>Ngày sinh</label>
                <input type="date" />
              </div>
              <button type="button" className="btn_pt_primary">
                Cập nhật
              </button>
            </form>
          </div>
        )}

        {/* Bookings */}
        {activeTab === "bookings" && (
          <div className="pt_tab">
            <h2>Lịch sử đặt lịch</h2>
            {bookings.length === 0 ? (
              <p>Không có buổi tập nào.</p>
            ) : (
              <table className="pt_table">
                <thead>
                  <tr>
                    <th>Học viên</th>
                    <th>Ngày</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.studentName || "Ẩn danh"}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Students */}
        {activeTab === "students" && (
          <div className="pt_tab">
            <h2>Quản lý học viên</h2>
            {students.length === 0 ? (
              <p>Chưa có học viên nào đăng ký.</p>
            ) : (
              <table className="pt_table">
                <thead>
                  <tr>
                    <th>Tên học viên</th>
                    <th>Tiến độ</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id}>
                      <td>{s.name}</td>
                      <td>{s.progress || "—"}</td>
                      <td>{s.status || "Đang hoạt động"}</td>
                      <td>
                        <button className="btn_pt_secondary">Chi tiết</button>
                        <button className="btn_pt_primary">Cập nhật</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button
              className="btn_pt_primary"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate("/update")}
            >
              + Thêm học viên
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PThome;
