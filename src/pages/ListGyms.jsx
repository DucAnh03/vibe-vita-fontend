import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/ListGyms.css'

// ===== Dummy data (sửa tuỳ ý) =====
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

// ===== Helpers =====
const getNumericPrice = (priceStr) => {
  if (!priceStr) return Number.POSITIVE_INFINITY
  const m = priceStr.replace(/\./g, '').match(/(\d{2,})/) // lấy số đầu tiên
  return m ? parseInt(m[1], 10) : Number.POSITIVE_INFINITY
}

export default function ListGyms() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [sortOpen, setSortOpen] = useState(false)
  const [sortKey, setSortKey] = useState('default') // default | rating | priceAsc | priceDesc | name
  const [sortDir, setSortDir] = useState('desc') // cho một số kiểu, ví dụ name

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let data = [...GYMS]

    if (q) {
      data = data.filter((g) => {
        const inName = g.name?.toLowerCase().includes(q)
        const inAddr = g.address?.toLowerCase().includes(q)
        const inAmen = (g.amenities || []).join(' ').toLowerCase().includes(q)
        return inName || inAddr || inAmen
      })
    }

    switch (sortKey) {
      case 'rating':
        data.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'priceAsc':
        data.sort((a, b) => getNumericPrice(a.price) - getNumericPrice(b.price))
        break
      case 'priceDesc':
        data.sort((a, b) => getNumericPrice(b.price) - getNumericPrice(a.price))
        break
      case 'name':
        data.sort((a, b) =>
          (a.name || '').localeCompare(b.name || '', 'vi', {
            sensitivity: 'base'
          })
        )
        if (sortDir === 'desc') data.reverse()
        break
      default:
        // giữ nguyên thứ tự dummy
        break
    }

    return data
  }, [query, sortKey, sortDir])

  const goDetail = (id) => navigate(`/gym-detail/${id}`)
  const call = (phone) => window.open(`tel:${phone}`, '_self')

  return (
    <div className="gy-page">
      <h1 className="gy-title">DANH SÁCH PHÒNG TẬP</h1>

      {/* Toolbar: Search + Sort */}
      <div className="gy-toolbar">
        <div className="gy-search">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm phòng tập, địa chỉ, tiện ích..."
            aria-label="Tìm kiếm phòng tập"
          />
        </div>

        <div className="gy-sort">
          <button
            className="gy-sort-btn"
            onClick={() => setSortOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={sortOpen}
          >
            <FunnelIcon />
            <span>Sắp xếp theo</span>
          </button>
          <button
            className="gy-sort-dir"
            onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
            title="Đảo chiều A-Z / Z-A (áp dụng cho sắp xếp theo Tên)"
          >
            <SwapIcon />
          </button>

          {sortOpen && (
            <div className="gy-sort-menu" role="menu">
              <SortItem
                label="Mặc định"
                active={sortKey === 'default'}
                onClick={() => {
                  setSortKey('default')
                  setSortOpen(false)
                }}
              />
              <SortItem
                label="Đánh giá cao"
                active={sortKey === 'rating'}
                onClick={() => {
                  setSortKey('rating')
                  setSortOpen(false)
                }}
              />
              <SortItem
                label="Giá tăng dần"
                active={sortKey === 'priceAsc'}
                onClick={() => {
                  setSortKey('priceAsc')
                  setSortOpen(false)
                }}
              />
              <SortItem
                label="Giá giảm dần"
                active={sortKey === 'priceDesc'}
                onClick={() => {
                  setSortKey('priceDesc')
                  setSortOpen(false)
                }}
              />
              <SortItem
                label={`Tên (${sortDir === 'asc' ? 'A→Z' : 'Z→A'})`}
                active={sortKey === 'name'}
                onClick={() => {
                  setSortKey('name')
                  setSortOpen(false)
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="gy-grid">
        {filtered.map((g) => (
          <article key={g.id} className="gy-card">
            <div
              className="gy-image-wrap"
              onClick={() => goDetail(g.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goDetail(g.id)}
            >
              <img className="gy-image" src={g.image} alt={g.name} />
            </div>

            <div className="gy-name">{g.name}</div>

            <ul className="gy-info">
              <li>
                <PinIcon />
                <span>{g.address}</span>
              </li>
              <li>
                <ClockIcon />
                <span>{g.hours}</span>
              </li>
              <li>
                <StarIcon />
                <span>{g.rating ? `${g.rating}/5.0` : 'Chưa có đánh giá'}</span>
              </li>
              <li>
                <TicketIcon />
                <span>{g.price}</span>
              </li>
            </ul>

            <div className="gy-actions">
              <button className="gy-btn primary" onClick={() => call(g.phone)}>
                GỌI ĐIỆN
              </button>
              <button className="gy-btn ghost" onClick={() => goDetail(g.id)}>
                TƯ VẤN
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function SortItem({ label, active, onClick }) {
  return (
    <button
      className={`gy-sort-item ${active ? 'active' : ''}`}
      role="menuitem"
      onClick={onClick}
    >
      {label}
    </button>
  )
}

/* ====== Icons (SVG thuần, không cần lib) ====== */
function FunnelIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" fill="currentColor" />
    </svg>
  )
}
function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M7 7h10l-3-3 1.4-1.4L21 8l-5.6 5.4L14 12l3-3H7V7Zm10 10H7l3 3-1.4 1.4L3 16l5.6-5.4L10 12l-3 3h10v2Z"
        fill="currentColor"
      />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.471 6.471 0 0 0 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
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
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 5h-2v6l5 3 .999-1.732L13 12.5V7Z"
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
        fill="currentColor"
      />
    </svg>
  )
}
