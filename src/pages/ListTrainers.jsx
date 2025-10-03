import React from "react";
import "../styles/ListTrainers.css";

const trainers = [
  {
    id: 1,
    name: "Oke em",
    specialty: "Yoga",
    rating: 4.8,
    reviews: 314,
    experience: "5 năm kinh nghiệm",
    location: "271 Nguyễn Văn Linh, TP. Đà Nẵng",
    price: "200.000 VND/buổi",
    // Thay link ảnh thật của bạn
    image:
      "https://media.istockphoto.com/id/1128908111/vi/anh/c%C6%A1-b%E1%BA%AFp-u%E1%BB%91n-cong.jpg?s=612x612&w=0&k=20&c=hyqXYXcODsJpjWW_7_U07W0eXQ9b2KmfnigSL0WHMhY=",
    phone: "0900000001",
  },
  {
    id: 2,
    name: "ANNE HATHAWAY",
    specialty: "Yoga",
    rating: 4.8,
    reviews: 314,
    experience: "5 năm kinh nghiệm",
    location: "271 Nguyễn Văn Linh, TP. Đà Nẵng",
    price: "200.000 VND/buổi",
    image:
      "https://media.istockphoto.com/id/1779816273/vi/anh/ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-c%C6%A1-b%E1%BA%AFp-cho-th%E1%BA%A5y-c%C6%A1-b%E1%BA%AFp-c%E1%BB%A7a-m%C3%ACnh-tr%C3%AAn-n%E1%BB%81n-c%E1%BB%A7a-m%E1%BB%99t-b%E1%BB%A9c-t%C6%B0%E1%BB%9Dng-%C4%91en-v%E1%BA%ADn-%C4%91%E1%BB%99ng-vi%C3%AAn-th%E1%BB%83.jpg?s=612x612&w=0&k=20&c=atcfVbsCZ79rAtg_BmVeHXbFbt73lO_jsxFP2eFAmNA=",
    phone: "0900000002",
  },
  {
    id: 3,
    name: "ANNE HATHAWAY",
    specialty: "Yoga",
    rating: 4.8,
    reviews: 314,
    experience: "5 năm kinh nghiệm",
    location: "271 Nguyễn Văn Linh, TP. Đà Nẵng",
    price: "200.000 VND/buổi",
    image:
      "https://media.istockphoto.com/id/1192713902/vi/anh/ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-c%C6%A1-b%E1%BA%AFp-cho-th%E1%BA%A5y-c%C6%A1-b%E1%BA%AFp-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-%C4%91en-c%C6%A1-b%E1%BB%A5ng-th%C3%A2n-tr%E1%BA%A7n-c%E1%BB%A7a-nam-gi%E1%BB%9Bi-m%E1%BA%A1nh.jpg?s=612x612&w=0&k=20&c=380CCvvTN68bhPR3CTkTuRzgFbsRnGYhOoSclB43CLI=",
    phone: "0900000003",
  },
];

export default function ListTrainers() {
  const call = (phone) => window.open(`tel:${phone}`, "_self");

  return (
    <div className="pt-page">
      <h1 className="pt-title">DANH SÁCH PT</h1>

      <div className="pt-grid">
        {trainers.map((t) => (
          <article key={t.id} className="pt-card">
            <div className="pt-image-wrap">
              <img src={t.image} alt={t.name} className="pt-image" />
            </div>

            {/* Tên đặt DƯỚI ảnh, không chồng lên */}
            <div className="pt-name">{t.name}</div>

            {/* Các dòng mô tả: dùng <p> hết */}
            <div className="pt-meta">
              <p className="pt-line">
                <IconDumbbell />
                <span>{t.specialty}</span>
              </p>
              <p className="pt-line">
                <IconStar />
                <span>
                  {t.rating}/5.0 ({t.reviews} Reviews)
                </span>
              </p>
              <p className="pt-line">
                <IconBadge />
                <span>{t.experience}</span>
              </p>
              <p className="pt-line">
                <IconPin />
                <span>{t.location}</span>
              </p>
              <p className="pt-line">
                <IconVideo />
                <span>{t.price}</span>
              </p>
            </div>

            <div className="pt-actions">
              <button className="pt-btn primary" onClick={() => call(t.phone)}>
                GỌI ĐIỆN
              </button>
              <button
                className="pt-btn ghost"
                onClick={() => alert("Tư vấn (demo)")}
              >
                TƯ VẤN
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ==== Icon SVG ==== */
function IconDumbbell() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M5 10h2v4H5v-4Zm12 0h2v4h-2v-4ZM8 9h8v6H8V9Z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2 9.6 8H3l5.2 3.8L5.8 18 12 14.2 18.2 18l-2.4-6.2L21 8h-6.6L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconBadge() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2 3 7v7c0 4 6 8 9 8s9-4 9-8V7l-9-5Zm0 6 2 4 4 .5-3 2.8.8 3.9L12 17l-3.8 2.2.8-3.9-3-2.8 4-.5 2-4Z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconVideo() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M4 6h10a2 2 0 0 1 2 2v2l4-2v8l-4-2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        fill="currentColor"
      />
    </svg>
  );
}
