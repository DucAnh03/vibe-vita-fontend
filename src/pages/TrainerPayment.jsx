import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/pages/TrainerPayment.css'

export default function TrainerPayment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [trainer, setTrainer] = useState(null)
  const [paying, setPaying] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')

  // ✅ Lấy thông tin user
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const userId = currentUser?._id || currentUser?.id
  const paidKey = `paidPTs_${userId}`

  // ✅ Kiểm tra nếu PT đã thanh toán
  useEffect(() => {
    if (!userId) return
    const paidPTs = JSON.parse(localStorage.getItem(paidKey)) || []
    if (paidPTs.includes(id)) {
      setIsPaid(true)
      setTimeout(() => navigate(`/trainers/${id}`), 1200)
    }
  }, [id, navigate, userId, paidKey])

  // ✅ Lấy thông tin PT (gắn prefix ảnh nếu tương đối)
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/trainers/${id}`)
        if (!res.ok) throw new Error('Không tìm thấy PT')
        const data = await res.json()

        const fullImage =
          data.image && !data.image.startsWith('http')
            ? `http://localhost:5000${data.image}`
            : data.image

        setTrainer({ ...data, image: fullImage })
      } catch (err) {
        console.error('❌ Lỗi khi load trainer:', err)
        setTrainer(null)
      }
    }
    fetchTrainer()
  }, [id])

  // ✅ Danh sách 3 gói Premium
  const plans = [
    { id: 'oneDay', name: 'Gói 1 Ngày - 20.000đ' },
    { id: 'threeToSevenDays', name: 'Gói 7 Ngày - 40.000đ' },
    { id: 'monthly', name: 'Gói 1 Tháng - 60.000đ' }
  ]

  // ✅ Thanh toán
  const handlePayment = async () => {
    try {
      if (!token) {
        alert('Vui lòng đăng nhập để thanh toán.')
        navigate('/login')
        return
      }
      if (!selectedPlan) {
        alert('Vui lòng chọn gói để thanh toán.')
        return
      }

      setPaying(true)
      localStorage.setItem('selectedTrainer', id)

      const res = await fetch('http://localhost:5000/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ packageType: selectedPlan })
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.message)

      // ✅ Chuyển qua trang PayOS
      window.location.href = data.data.checkoutUrl
    } catch (err) {
      alert('❌ Lỗi tạo link thanh toán: ' + err.message)
      setPaying(false)
    }
  }

  if (isPaid) {
    return (
      <div className="trainer-payment-page">
        <h2>
          💚 Bạn đã thanh toán cho PT này. Đang chuyển đến trang đặt lịch...
        </h2>
      </div>
    )
  }

  if (!trainer) {
    return (
      <h2 style={{ color: '#fff', padding: '40px' }}>
        ❌ Không tìm thấy huấn luyện viên
      </h2>
    )
  }

  const imgSrc =
    trainer.image || 'https://via.placeholder.com/400x400?text=No+Image'

  return (
    <div className="tp-page">
      <h1 className="tp-title">NÂNG CẤP DỊCH VỤ HUẤN LUYỆN VIÊN</h1>

      {/* === Toolbar: nút quay lại giống TrainerDetail, nằm ngoài ảnh, sát mép trái === */}
      <div className="tp-toolbar">
        <button className="tp-back" onClick={() => navigate('/list-trainers')}>
          <ArrowLeftIcon />
          <span>Quay lại danh sách PT</span>
        </button>
      </div>

      <div className="tp-container">
        {/* LEFT */}
        <div className="tp-left">
          {/* (ĐÃ BỎ nút tp-back khỏi đây để không đè ảnh) */}
          <h2 className="tp-subtitle">THÔNG TIN HUẤN LUYỆN VIÊN</h2>

          <div className="tp-image-wrap">
            <img
              src={imgSrc}
              alt={trainer.username}
              onError={(e) => {
                e.currentTarget.src =
                  'https://via.placeholder.com/400x400?text=No+Image'
              }}
            />
          </div>
          <div className="tp-name">
            {trainer.username?.toUpperCase() || 'HUẤN LUYỆN VIÊN'}
          </div>
          <div className="tp-rating">⭐ {trainer.rating || 5}/5.0</div>
        </div>

        {/* RIGHT */}
        <div className="tp-right">
          <ul className="tp-info-list">
            <li>📍 {trainer.location || 'Chưa cập nhật'}</li>
            <li>💪 {trainer.specialty || 'Chưa cập nhật'}</li>
            <li>🎖 {trainer.experience || 'Chưa cập nhật'}</li>
          </ul>

          <div className="tp-upgrade-section">
            <h3 className="tp-schedule-title">
              🚀 Chọn gói Premium để đặt lịch và mở khóa tính năng cao cấp
            </h3>

            <select
              className="tp-select"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="">-- Chọn gói Premium --</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>

            <button
              className="tp-btn"
              onClick={handlePayment}
              disabled={paying}
            >
              {paying
                ? 'ĐANG TẠO LINK...'
                : selectedPlan
                ? 'THANH TOÁN NGAY'
                : 'CHỌN GÓI TRƯỚC'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==== Icon SVG ==== */
function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M20 11v2H8l4 4-1.4 1.4L4.2 12l6.4-6.4L12 7l-4 4h12z"
        fill="currentColor"
      />
    </svg>
  )
}
