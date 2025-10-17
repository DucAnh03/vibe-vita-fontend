import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/pages/GymDetail.css'

/* ===== SAME hard-coded data as ListGyms (có thể sửa theo bạn) ===== */
const GYMS = [
  {
    id: 1,
    name: 'Yoga',
    address: 'Lô 29 đường 2/9, Q. Hải Châu, TP. Đà Nẵng',
    image:
      'https://daivietourist.vn/wp-content/uploads/2025/09/phong-gym-da-nang-1.jpg',
    phone: '0901111222',
    hours: '05:30 – 22:00',
    price: 'Vé ngày 80.000 VND',
    rating: 4.8,
    amenities: ['Yoga', 'Cardio', 'Weights']
  },
  {
    id: 2,
    name: 'California Fitness & Yoga',
    address: '171 Nguyễn Văn Linh, Q. Thanh Khê, TP. Đà Nẵng',
    image:
      'https://daivietourist.vn/wp-content/uploads/2025/09/phong-gym-da-nang-3.jpg',
    phone: '0902222333',
    hours: '06:00 – 22:00',
    price: 'Từ 399.000 VND/tháng',
    rating: 4.7,
    amenities: ['Sauna', 'PT', 'Functional']
  },
  {
    id: 3,
    name: 'California Fitness & Yoga',
    address: '59 Lê Duẩn, Q. Hải Châu, TP. Đà Nẵng',
    image:
      'https://daivietourist.vn/wp-content/uploads/2025/09/phong-gym-da-nang-4.jpg',
    phone: '0903333444',
    hours: '05:30 – 23:00',
    price: 'Vé ngày 100.000 VND',
    rating: 4.9,
    amenities: ['CrossFit', 'Weights', 'Spin']
  },
  {
    id: 4,
    name: 'California Fitness & Yoga',
    address: '09 Phan Châu Trinh, Q. Hải Châu, TP. Đà Nẵng',
    image:
      'https://daivietourist.vn/wp-content/uploads/2025/09/phong-gym-da-nang-6.jpg',
    phone: '0904444555',
    hours: '06:00 – 22:00',
    price: 'Từ 450.000 VND/tháng',
    rating: 4.6,
    amenities: ['Yoga', 'Steam', 'PT']
  }
]

export default function GymDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const gym = GYMS.find((g) => String(g.id) === String(id))

  const call = (phone) =>
    phone
      ? window.open(`tel:${phone}`, '_self')
      : alert('Chưa có số điện thoại.')

  if (!gym) {
    return (
      <div className="gyd-page">
        <div className="gyd-container">
          <button className="gyd-back" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <h1 className="gyd-title">Không tìm thấy phòng tập</h1>
          <p className="gyd-empty">ID không tồn tại trong dữ liệu cứng.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="gyd-page">
      <div className="gyd-container">
        <button className="gyd-back" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>

        <div className="gyd-card">
          <div className="gyd-image-wrap">
            <img src={gym.image} alt={gym.name} className="gyd-image" />
          </div>

          <div className="gyd-name">{gym.name}</div>

          <ul className="gyd-info">
            <li>
              <PinIcon />
              <span>{gym.address}</span>
            </li>
            <li>
              <ClockIcon />
              <span>{gym.hours}</span>
            </li>
            <li>
              <StarIcon />
              <span>
                {gym.rating ? `${gym.rating}/5.0` : 'Chưa có đánh giá'}
              </span>
            </li>
            <li>
              <TicketIcon />
              <span>{gym.price}</span>
            </li>
          </ul>

          {Array.isArray(gym.amenities) && gym.amenities.length > 0 && (
            <div className="gyd-chips">
              {gym.amenities.map((a, i) => (
                <span key={i} className="gyd-chip">
                  <CheckIcon /> {a}
                </span>
              ))}
            </div>
          )}

          <div className="gyd-actions">
            <button className="gyd-btn primary" onClick={() => call(gym.phone)}>
              GỌI ĐIỆN
            </button>
            <button
              className="gyd-btn ghost"
              onClick={() => alert('Tư vấn (demo)')}
            >
              TƯ VẤN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==== Icons (SVG) ==== */
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
        fill="#ff4747"
      />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 5h-2v6l5 3 .999-1.732L13 12.5V7Z"
        fill="#5cc2ff"
      />
    </svg>
  )
}
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2 9.6 8H3l5.2 3.8L5.8 18 12 14.2 18.2 18l-2.4-6.2L21 8h-6.6L12 2z"
        fill="#ffb800"
      />
    </svg>
  )
}
function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M3 7h18v4a2 2 0 0 1 0 4v4H3v-4a2 2 0 0 1 0-4V7Zm5 3v4h2v-4H8Zm6 0v4h2v-4h-2Z"
        fill="#ffffff"
      />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z"
        fill="currentColor"
      />
    </svg>
  )
}
