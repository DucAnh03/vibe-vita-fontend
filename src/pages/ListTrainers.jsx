import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ListTrainers.css";

export default function ListTrainers() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/trainers");
        const data = await res.json();

        // ✅ Gắn prefix domain cho ảnh
        const trainersWithFullImage = data.map((t) => ({
          ...t,
          image:
            t.image && !t.image.startsWith("http")
              ? `http://localhost:5000${t.image}`
              : t.image,
        }));

        setTrainers(trainersWithFullImage);
      } catch (err) {
        console.error("❌ Lỗi khi tải danh sách trainers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) {
    return (
      <p style={{ color: "#fff", textAlign: "center", marginTop: "4rem" }}>
        Đang tải danh sách huấn luyện viên...
      </p>
    );
  }

  return (
    <div className="lt-page">
      <h1 className="lt-title">DANH SÁCH HUẤN LUYỆN VIÊN</h1>

      <div className="lt-grid">
        {trainers.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center", width: "100%" }}>
            Không có huấn luyện viên nào được tìm thấy.
          </p>
        ) : (
          trainers.map((t) => (
            <article key={t._id} className="lt-card">
              <div
                className="lt-image-wrap"
                onClick={() => navigate(`/trainers/${t._id}`)}
              >
                <img
                  src={
                    t.image ||
                    "https://via.placeholder.com/400x400?text=No+Image"
                  }
                  alt={t.username}
                  className="lt-image"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x400?text=No+Image")
                  }
                />
              </div>

              <div className="lt-name">
                {t.username?.toUpperCase() || "HUẤN LUYỆN VIÊN"}
              </div>

              <div className="lt-meta">
                <p className="lt-line">
                  <PinIcon />
                  <span>{t.location || "Chưa cập nhật"}</span>
                </p>
                <p className="lt-line">
                  <StarIcon />
                  <span>
                    {t.rating ? `${t.rating}/5.0` : "Chưa có đánh giá"}
                  </span>
                </p>
              </div>

              <button
                className="lt-btn lt-btn--ghost"
                onClick={() => navigate(`/trainer-payment/${t._id}`)}
              >
                XEM CHI TIẾT
              </button>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

/* ==== ICONS ==== */
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}
