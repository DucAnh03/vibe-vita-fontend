import React from 'react'
// import "./ListTrainers.css";

const trainers = [
  {
    id: 1,
    name: 'ANNE HATHAWAY',
    specialty: 'Yoga',
    rating: 4.8,
    reviews: 314,
    experience: '5 năm kinh nghiệm',
    location: '271 Nguyễn Văn Linh, TP. Đà Nẵng',
    price: '200.000 VND/buổi',
    // TODO: thay ảnh của bạn vào đây
    image: 'https://picsum.photos/seed/pt1/900/700',
    phone: '0900000001'
  },
  {
    id: 2,
    name: 'ANNE HATHAWAY',
    specialty: 'Yoga',
    rating: 4.8,
    reviews: 314,
    experience: '5 năm kinh nghiệm',
    location: '271 Nguyễn Văn Linh, TP. Đà Nẵng',
    price: '200.000 VND/buổi',
    image: 'https://picsum.photos/seed/pt2/900/700',
    phone: '0900000002'
  },
  {
    id: 3,
    name: 'ANNE HATHAWAY',
    specialty: 'Yoga',
    rating: 4.8,
    reviews: 314,
    experience: '5 năm kinh nghiệm',
    location: '271 Nguyễn Văn Linh, TP. Đà Nẵng',
    price: '200.000 VND/buổi',
    image: 'https://picsum.photos/seed/pt3/900/700',
    phone: '0900000003'
  }
]

export default function ListTrainers() {
  const call = (phone) => window.open(`tel:${phone}`, '_self')

  return (
    <div className="pt-page">
      <h1 className="pt-title">DANH SÁCH PT</h1>

      <div className="pt-grid">
        {trainers.map((t) => (
          <article key={t.id} className="pt-card">
            <div className="pt-image-wrap">
              <img src={t.image} alt={t.name} className="pt-image" />
            </div>

            {/* name pill */}
            <div className="pt-name">{t.name}</div>

            {/* info */}
            <ul className="pt-info">
              <li>
                <DumbbellIcon />
                <span>{t.specialty}</span>
              </li>
              <li>
                <StarIcon />
                <span>
                  {t.rating}/5.0 ({t.reviews} Reviews)
                </span>
              </li>
              <li>
                <BadgeIcon />
                <span>{t.experience}</span>
              </li>
              <li>
                <PinIcon />
                <span>{t.location}</span>
              </li>
              <li>
                <VideoIcon />
                <span>{t.price}</span>
              </li>
            </ul>

            <div className="pt-actions">
              <button className="pt-btn primary" onClick={() => call(t.phone)}>
                GỌI ĐIỆN
              </button>
              <button
                className="pt-btn ghost"
                onClick={() => alert('Tư vấn (demo)')}
              >
                TƯ VẤN
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ==== Icon SVG minimal, không cần cài thư viện ==== */
function DumbbellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M5 10h2v4H5v-4Zm12 0h2v4h-2v-4ZM8 9h8v6H8V9Z"
        fill="currentColor"
      />
    </svg>
  )
}
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2 9.6 8H3l5.2 3.8L5.8 18 12 14.2 18.2 18l-2.4-6.2L21 8h-6.6L12 2z"
        fill="currentColor"
      />
    </svg>
  )
}
function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2 3 7v7c0 4 6 8 9 8s9-4 9-8V7l-9-5Zm0 6 2 4 4 .5-3 2.8.8 3.9L12 17l-3.8 2.2.8-3.9-3-2.8 4-.5 2-4Z"
        fill="currentColor"
      />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M4 6h10a2 2 0 0 1 2 2v2l4-2v8l-4-2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        fill="currentColor"
      />
    </svg>
  )
}
