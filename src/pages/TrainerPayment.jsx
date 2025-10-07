import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/pages/TrainerPayment.css";

export default function TrainerPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [trainer, setTrainer] = useState(null);
  const [paying, setPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // ✅ Lấy thông tin user đang đăng nhập
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser?._id || currentUser?.id;
  const paidKey = `paidPTs_${userId}`; // mỗi user có danh sách PT riêng

  // ✅ Kiểm tra nếu PT này đã được thanh toán bởi user hiện tại
  useEffect(() => {
    if (!userId) return;
    const paidPTs = JSON.parse(localStorage.getItem(paidKey)) || [];
    if (paidPTs.includes(id)) {
      setIsPaid(true);
      setTimeout(() => navigate(`/trainers/${id}`), 1200); // tự chuyển sau 1.2s
    }
  }, [id, navigate, userId, paidKey]);

  // ✅ Lấy thông tin PT
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/trainers");
        const data = await res.json();
        const found = data.find((t) => t._id === id);
        setTrainer(found || null);
      } catch (err) {
        console.error("❌ Lỗi khi load trainer:", err);
      }
    };
    fetchTrainer();
  }, [id]);

  // ✅ Bắt đầu thanh toán
  const handlePayment = async () => {
    try {
      if (!token) {
        alert("Vui lòng đăng nhập để thanh toán.");
        navigate("/login");
        return;
      }

      setPaying(true);
      localStorage.setItem("selectedTrainer", id);

      const res = await fetch("http://localhost:5000/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: 50000,
          packageType: "monthly",
          returnUrl: `${window.location.origin}/payment-success`,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // ✅ Chuyển qua trang thanh toán PayOS
      window.location.href = data.data.checkoutUrl;
    } catch (err) {
      alert("❌ Lỗi tạo link thanh toán: " + err.message);
      setPaying(false);
    }
  };

  if (isPaid) {
    return (
      <div className="trainer-payment-page">
        <h2>
          💚 Bạn đã thanh toán cho PT này. Đang chuyển đến trang đặt lịch...
        </h2>
      </div>
    );
  }

  if (!trainer)
    return (
      <h2 style={{ color: "#fff", padding: "40px" }}>Không tìm thấy PT này</h2>
    );

  // ✅ Giao diện đẹp, đồng bộ với TrainerDetail
  return (
    <div className="tp-page">
      <h1 className="tp-title">NÂNG CẤP DỊCH VỤ HUẤN LUYỆN VIÊN</h1>

      <div className="tp-container">
        {/* LEFT */}
        <div className="tp-left">
          <button
            className="tp-back"
            onClick={() => navigate("/list-trainers")}
          >
            ← Quay lại danh sách PT
          </button>

          <h2 className="tp-subtitle">THÔNG TIN HUẤN LUYỆN VIÊN</h2>
          <div className="tp-image-wrap">
            <img
              src={trainer.image || "https://via.placeholder.com/400"}
              alt={trainer.username}
            />
          </div>
          <div className="tp-name">{trainer.username}</div>
          <div className="tp-rating">⭐ {trainer.rating || 5}/5.0</div>
        </div>

        {/* RIGHT */}
        <div className="tp-right">
          <ul className="tp-info-list">
            <li>📍 {trainer.location || "Chưa cập nhật"}</li>
            <li>💪 {trainer.specialty || "Chưa cập nhật"}</li>
            <li>🎖 {trainer.experience || "Chưa cập nhật"}</li>
          </ul>

          <div className="tp-upgrade-section">
            <h3 className="tp-schedule-title">
              🚀 Nâng cấp gói Premium để đặt lịch và sử dụng các tính năng cao
              cấp
            </h3>
            <p className="tp-desc">
              Khi nâng cấp, bạn có thể chat trực tiếp với PT, đặt lịch linh
              hoạt, và theo dõi tiến độ tập luyện của mình.
              <br />
              <span className="tp-price">
                💰 Gói Premium chỉ 50.000đ / tháng
              </span>
            </p>

            <button
              className="tp-btn"
              onClick={handlePayment}
              disabled={paying}
            >
              {paying ? "ĐANG TẠO LINK..." : "THANH TOÁN NGAY"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
