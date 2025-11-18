import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/pages/TrainersDetail.css'

export default function TrainerDetail() {
  const { id } = useParams() // ID của PT
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [trainer, setTrainer] = useState(null)
  const [scheduleData, setScheduleData] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingTrainer, setLoadingTrainer] = useState(true)

  // ✅ Lấy chi tiết Trainer theo ID
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/trainers/${id}`)
        if (!res.ok) throw new Error('Không tìm thấy trainer')
        const data = await res.json()
        setTrainer(data)
      } catch (err) {
        console.error('❌ Lỗi khi load trainer:', err)
        setTrainer(null)
      } finally {
        setLoadingTrainer(false)
      }
    }
    fetchTrainer()
  }, [id])

  if (loadingTrainer)
    return (
      <div className="td-loading">
        <div className="spinner" /> Đang tải thông tin huấn luyện viên...
      </div>
    )

  if (!trainer)
    return (
      <h2 style={{ color: '#fff', padding: '40px' }}>
        ❌ Trainer không tồn tại hoặc đã bị xóa!
      </h2>
    )

  // ✅ Danh sách ngày và giờ mẫu
  const days = [
    'Mon (3/11)',
    'Tue (04/11)',
    'Wed (05/11)',
    'Thur (06/11)',
    'Fri (07/11)',
    'Sat (08/11)',
    'Sun (09/11)'
  ]
  const times = ['7h', '9h', '11h', '13h', '15h', '17h', '19h']

  // ✅ Ghi chú khi đặt lịch
  const handleInputChange = (day, time, value) => {
    setScheduleData((prev) => ({
      ...prev,
      [`${day}-${time}`]: value
    }))
  }

  // ✅ Gửi booking về backend
  const handleSubmit = async () => {
    if (!token) {
      alert('🚫 Bạn cần đăng nhập để đặt lịch!')
      return
    }

    const entries = Object.entries(scheduleData || {})
    const bookings = entries.reduce((acc, [key, raw]) => {
      const note = (raw ?? '').toString().trim()
      if (!note) return acc
      const [day, time] = key.split('-')
      if (!day || !time) return acc
      acc.push({ day, time, note })
      return acc
    }, [])

    if (bookings.length === 0) {
      alert('⚠️ Vui lòng nhập ít nhất một ghi chú lịch!')
      return
    }

    setLoading(true)
    try {
      for (const b of bookings) {
        const res = await fetch('http://localhost:5000/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            trainerId: id,
            day: b.day,
            time: b.time,
            note: b.note
          })
        })

        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Lỗi khi đặt lịch')
        }
      }
      alert('✅ Đặt lịch thành công!')
      setScheduleData({})
    } catch (err) {
      console.error(err)
      alert('❌ ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const imgSrc = trainer.image
    ? trainer.image.startsWith('http')
      ? trainer.image
      : `http://localhost:5000${trainer.image}`
    : 'https://via.placeholder.com/400'

  return (
    <div className="td-page">
      <h1 className="td-title">CHI TIẾT HUẤN LUYỆN VIÊN</h1>

      {/* === Toolbar: nút Quay lại nằm ngoài ảnh, sát mép trái === */}
      <div className="td-toolbar">
        <button className="td-back" onClick={() => navigate('/list-trainers')}>
          <ArrowLeftIcon />
          <span>Quay lại</span>
        </button>
      </div>

      <div className="td-container">
        {/* Cột trái: Thông tin PT */}
        <div className="td-left">
          {/* (ĐÃ bỏ nút td-back khỏi đây để không đè ảnh) */}
          <h2 className="td-subtitle">THÔNG TIN HUẤN LUYỆN VIÊN</h2>

          <div className="td-image-wrap">
            <img
              src={imgSrc}
              alt={trainer.username || 'Trainer'}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400'
              }}
            />
          </div>

          <div className="td-name">
            {trainer.username?.toUpperCase() || 'HUẤN LUYỆN VIÊN'}
          </div>
          <div className="td-rating">⭐ {trainer.rating || 5}/5.0</div>
        </div>

        {/* Cột phải: Lịch & Thông tin */}
        <div className="td-right">
          <ul className="td-info-list">
            <li>📧 {trainer.email || 'Chưa cập nhật'}</li>
            <li>📍 {trainer.location || 'Chưa cập nhật'}</li>
            <li>💪 {trainer.specialty || 'Chưa cập nhật'}</li>
            <li>🎖 {trainer.experience || 'Chưa cập nhật'}</li>
            <li>
              💰{' '}
              {trainer.prices?.monthly ||
                trainer.prices?.oneSession ||
                trainer.price ||
                'Thỏa thuận'}{' '}
              VNĐ
            </li>
            {trainer.description && <li>🗒 {trainer.description}</li>}
          </ul>

          <h3 className="td-schedule-title">📅 ĐẶT LỊCH NGAY</h3>
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
                          value={scheduleData[`${day}-${time}`] || ''}
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
            {loading ? '⏳ ĐANG GỬI...' : '💪 ĐẶT NGAY'}
          </button>
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
