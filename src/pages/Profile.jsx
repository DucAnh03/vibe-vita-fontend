import React, { useEffect, useRef, useState } from 'react'
import '../styles/pages/Profile.css'

const API_BASE = 'http://localhost:5000'

export default function Profile() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const fileInputRef = useRef(null)
  const token = localStorage.getItem('token')

  // 🔹 Lấy dữ liệu user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const result = await res.json()

        if (res.ok) {
          const defaultHealth = {
            gender: '',
            weight: '',
            height: '',
            bmi: '',
            bmiCategory: ''
          }
          const safeData = {
            ...result.data,
            healthInfo: result.data.healthInfo || defaultHealth
          }
          setData(safeData)
        }
      } catch (err) {
        console.error('Lỗi tải profile:', err)
        setMessage({
          text: '❌ Không thể tải thông tin người dùng!',
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  // 🔔 Alert tự ẩn
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 4000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // ✅ Xử lý thay đổi input user
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      user: { ...prev.user, [name]: value }
    }))
  }

  // ✅ Xử lý thay đổi thông tin sức khỏe
  const handleHealthChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      healthInfo: { ...(prev.healthInfo || {}), [name]: value }
    }))
  }

  // ✅ Cập nhật thông tin
  const handleSave = async () => {
    setUpdating(true)
    try {
      const payload = {
        ...data.user,
        healthInfo: data.healthInfo
      }
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      const result = await res.json()
      if (res.ok) {
        setData(result.data)
        setMessage({ text: '✅ Cập nhật thành công!', type: 'success' })
      } else {
        setMessage({ text: '❌ Cập nhật thất bại!', type: 'error' })
      }
    } catch (err) {
      console.error('Lỗi:', err)
      setMessage({ text: '❌ Có lỗi xảy ra!', type: 'error' })
    } finally {
      setUpdating(false)
    }
  }

  // ✅ Upload avatar
  const handleUploadAvatar = async (file) => {
    if (!file) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type))
      return setMessage({ text: '❌ File không hợp lệ!', type: 'error' })
    if (file.size > 5 * 1024 * 1024)
      return setMessage({ text: '❌ Ảnh vượt quá 5MB!', type: 'error' })

    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)
    setUploading(true)

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const res = await fetch(`${API_BASE}/api/auth/upload-avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })
      const result = await res.json()
      if (res.ok) {
        setData((prev) => ({ ...prev, user: result.user }))
        setMessage({ text: '✅ Ảnh đại diện đã cập nhật!', type: 'success' })
      } else {
        setMessage({ text: '❌ Upload thất bại!', type: 'error' })
      }
    } catch {
      setMessage({ text: '❌ Lỗi upload ảnh!', type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const handleChooseFile = () => {
    if (fileInputRef.current && !uploading) fileInputRef.current.click()
  }

  if (loading)
    return (
      <div className="profile-loading">
        <div className="spinner" /> Đang tải thông tin...
      </div>
    )

  const { user, healthInfo } = data

  return (
    <div className="profile-container">
      {/* Avatar */}
      <div className="profile-header">
        <div className="avatar-wrapper" onClick={handleChooseFile}>
          <img
            src={
              preview
                ? preview
                : user.image
                ? `${API_BASE}${user.image}`
                : 'https://via.placeholder.com/200x200?text=Avatar'
            }
            alt="avatar"
            className="avatar-img"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleUploadAvatar(e.target.files[0])}
          />
          {uploading && <p className="uploading-text">Đang tải ảnh...</p>}
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="profile-right">
        <h1 className="hello-text">
          XIN CHÀO, <span>{user.username?.toUpperCase()}!</span>
        </h1>

        {message.text && (
          <div
            className={`alert-message ${
              message.type === 'error' ? 'error' : 'success'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* =================== THÔNG TIN CÁ NHÂN =================== */}
        <section className="info-section">
          <h3>THÔNG TIN CÁ NHÂN</h3>

          <div className="info-row">
            <p>Tên của bạn</p>
            <input
              name="username"
              value={user.username || ''}
              onChange={handleChange}
            />
          </div>

          <div className="info-row">
            <p>Email</p>
            <input
              name="email"
              type="email"
              value={user.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className="info-row">
            <p>Số điện thoại</p>
            <input
              name="phone"
              value={user.phone || ''}
              onChange={handleChange}
            />
          </div>

          <div className="info-row">
            <p>Ngày sinh</p>
            <input
              name="dateOfBirth"
              type="date"
              value={
                user.dateOfBirth
                  ? new Date(user.dateOfBirth).toISOString().split('T')[0]
                  : ''
              }
              onChange={handleChange}
            />
          </div>
        </section>

        {/* =================== THÔNG SỐ SỨC KHỎE =================== */}
        <section className="info-section">
          <h3>THÔNG SỐ SỨC KHỎE</h3>

          <div className="info-row">
            <p>Giới tính</p>
            <input
              name="gender"
              value={healthInfo?.gender || ''}
              onChange={handleHealthChange}
            />
          </div>

          <div className="info-row">
            <p>Cân nặng (kg)</p>
            <input
              name="weight"
              type="number"
              value={healthInfo?.weight || ''}
              onChange={handleHealthChange}
            />
          </div>

          <div className="info-row">
            <p>Chiều cao (cm)</p>
            <input
              name="height"
              type="number"
              value={healthInfo?.height || ''}
              onChange={handleHealthChange}
            />
          </div>

          <div className="info-row">
            <p>BMI</p>
            <input
              readOnly
              value={
                healthInfo?.bmi
                  ? `${healthInfo.bmi} (${healthInfo.bmiCategory})`
                  : '—'
              }
              className="readonly-input"
            />
          </div>
        </section>

        {/* =================== GÓI ĐĂNG KÍ CỦA TÔI =================== */}
        <section className="info-section">
          <h3>
            GÓI ĐĂNG KÍ CỦA TÔI{' '}
            {user.isPremium ? (
              <span className="vip-text">VIP</span>
            ) : (
              <span className="not-vip">CHƯA ĐĂNG KÍ</span>
            )}
          </h3>
        </section>

        <div className="btn-save-container">
          <button className="btn-save" onClick={handleSave} disabled={updating}>
            {updating ? 'Đang lưu...' : '💾 Lưu thông tin'}
          </button>
        </div>
      </div>
    </div>
  )
}
