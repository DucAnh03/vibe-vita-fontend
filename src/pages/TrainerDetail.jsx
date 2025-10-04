import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/pages/TrainersDetail.css";

export default function TrainerDetail() {
  const { id } = useParams(); // id PT từ URL
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // token lưu sau khi login
  const [trainer, setTrainer] = useState(null);
  const [scheduleData, setScheduleData] = useState({});
  const [loading, setLoading] = useState(false);

  // Lấy trainer theo id
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/trainers`);
        const data = await res.json();
        const found = data.find((t) => t._id === id);
        setTrainer(found || null);
      } catch (err) {
        console.error("Lỗi khi load trainer:", err);
      }
    };
    fetchTrainer();
  }, [id]);

  if (!trainer) {
    return (
      <h2 style={{ color: "#fff", padding: "40px" }}>Trainer không tồn tại</h2>
    );
  }

  const days = [
    "Mon (4/10)",
    "Tue (5/10)",
    "Wed (6/10)",
    "Thur (7/10)",
    "Fri (8/10)",
    "Sat (9/10)",
    "Sun (10/10)",
  ];
  const times = ["7h", "9h", "11h", "13h", "15h", "17h", "19h"];

  const handleInputChange = (day, time, value) => {
    setScheduleData((prev) => ({
      ...prev,
      [`${day}-${time}`]: value,
    }));
  };

  // Gửi booking về backend
  const handleSubmit = async () => {
    if (!token) {
      alert("Bạn cần đăng nhập để đặt lịch!");
      return;
    }

    const entries = Object.entries(scheduleData || {});
    const bookings = entries.reduce((acc, [key, raw]) => {
      const note = (raw ?? "").toString().trim();
      if (!note) return acc;
      const [day, time] = key.split("-");
      if (!day || !time) return acc;
      acc.push({ day, time, note });
      return acc;
    }, []);

    if (bookings.length === 0) {
      alert("Vui lòng nhập ít nhất một ghi chú lịch!");
      return;
    }

    setLoading(true);
    try {
      for (const b of bookings) {
        const res = await fetch("http://localhost:5000/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // backend lấy userId từ token
          },
          body: JSON.stringify({
            trainerId: id,
            day: b.day,
            time: b.time,
            note: b.note,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Lỗi khi đặt lịch");
        }
      }
      alert("✅ Đặt lịch thành công!");
      setScheduleData({});
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="td-page">
      <h1 className="td-title">CHI TIẾT PT</h1>

      <div className="td-container">
        {/* LEFT */}
        <div className="td-left">
          <button className="td-back" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>

          <h2 className="td-subtitle">THÔNG TIN PT</h2>
          <div className="td-image-wrap">
            <img
              src={trainer.image || "https://via.placeholder.com/400"}
              alt={trainer.name}
            />
          </div>
          <div className="td-name">{trainer.name}</div>
          <div className="td-rating">⭐ {trainer.rating || 5}/5.0</div>
        </div>

        {/* RIGHT */}
        <div className="td-right">
          <ul className="td-info-list">
            <li>📍 {trainer.location || "Chưa cập nhật"}</li>
            <li>💪 {trainer.specialty || "Chưa cập nhật"}</li>
            <li>🎖 {trainer.experience || "Chưa cập nhật"}</li>
            <li>💰 {trainer.price || "Thỏa thuận"}</li>
          </ul>

          <h3 className="td-schedule-title">ĐẶT LỊCH NGAY</h3>
          <div className="td-schedule">
            <table>
              <thead>
                <tr>
                  <th></th>
                  {times.map((time) => (
                    <th key={time}>{time}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="day">{day}</td>
                    {times.map((time) => (
                      <td key={time}>
                        <input
                          type="text"
                          placeholder="..."
                          value={scheduleData[`${day}-${time}`] || ""}
                          onChange={(e) =>
                            handleInputChange(day, time, e.target.value)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="td-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "ĐANG ĐẶT..." : "ĐẶT NGAY"}
          </button>
        </div>
      </div>
    </div>
  );
}
