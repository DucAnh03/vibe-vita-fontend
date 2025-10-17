import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import '../styles/pages/TrainerProfile.css'

const API_BASE = 'http://localhost:5000'

export default function TrainerProfile() {
  const [trainer, setTrainer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const fileInputRef = useRef(null)
  const token = localStorage.getItem('token')

  // 🔹 Lấy thông tin trainer
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/auth/profile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setTrainer(res.data.data.user)
      } catch (err) {
        console.error('Lỗi tải profile PT:', err)
        setMessage({
          text: '❌ Không thể tải thông tin huấn luyện viên!',
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    }
    fetchTrainer()
  }, [])

  // 🔔 Alert tự ẩn sau 4s
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 4000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // ✅ Xử lý input thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target
    setTrainer((prev) => ({ ...prev, [name]: value }))
  }

  // ✅ Xử lý giá huấn luyện
  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setTrainer((prev) => ({
      ...prev,
      prices: { ...prev.prices, [name]: Number(value) }
    }))
  }

  // ✅ Cập nhật thông tin trainer
  const handleSave = async () => {
    setUpdating(true)
    try {
      const payload = {
        username: trainer.username,
        email: trainer.email,
        gender: trainer.gender,
        location: trainer.location,
        specialty: trainer.specialty,
        experience: trainer.experience,
        description: trainer.description,
        prices: trainer.prices
      }

      const res = await axios.put(
        `${API_BASE}/api/auth/trainer/profile`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.data.updated) {
        setTrainer(res.data.updated)
      }

      setMessage({ text: '✅ Cập nhật thành công!', type: 'success' })
    } catch (err) {
      console.error('Lỗi cập nhật:', err)
      setMessage({ text: '❌ Cập nhật thất bại!', type: 'error' })
    } finally {
      setUpdating(false)
    }
  }

  // ✅ Upload avatar
  const handleUploadAvatar = async (file) => {
    if (!file) return

    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setMessage({
        text: '❌ Chỉ chấp nhận ảnh JPG, PNG hoặc WEBP!',
        type: 'error'
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        text: '❌ Ảnh quá lớn (tối đa 5MB)!',
        type: 'error'
      })
      return
    }

    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)
    setUploading(true)

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/upload-avatar`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setTrainer((prev) => ({ ...prev, image: res.data.user.image }))
      setMessage({
        text: '✅ Ảnh đại diện đã được cập nhật!',
        type: 'success'
      })
    } catch (err) {
      setMessage({ text: '❌ Upload ảnh thất bại!', type: 'error' })
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

  if (!trainer)
    return (
      <div className="profile-loading text-danger">
        ❌ Không tìm thấy thông tin huấn luyện viên!
      </div>
    )

  return (
    <div className="trainer-container">
      {/* Sidebar trái */}
      <div className="trainer-left">
        <div className="avatar-wrapper" onClick={handleChooseFile}>
          <img
            src={
              preview
                ? preview
                : trainer.image
                ? `${API_BASE}${trainer.image}`
                : 'https://via.placeholder.com/200x200?text=Trainer'
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
        <h2>{trainer.username?.toUpperCase() || 'HUẤN LUYỆN VIÊN'}</h2>
      </div>

      {/* Nội dung phải */}
      <div className="trainer-right">
        <h1 className="hello-text">
          XIN CHÀO,{' '}
          <span>{trainer.username?.toUpperCase() || 'HUẤN LUYỆN VIÊN'}!</span>
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

        <section className="info-section">
          <h3>THÔNG TIN CƠ BẢN</h3>

          <div className="info-row">
            <p>Tên huấn luyện viên</p>
            <input
              name="username"
              value={trainer.username || ''}
              onChange={handleChange}
              placeholder="Nhập tên huấn luyện viên..."
            />
          </div>

          <div className="info-row">
            <p>Email</p>
            <input
              name="email"
              value={trainer.email || ''}
              onChange={handleChange}
              placeholder="Email của huấn luyện viên"
            />
          </div>

          <div className="info-row">
            <p>Giới tính</p>
            <input
              name="gender"
              value={trainer.gender || ''}
              onChange={handleChange}
              placeholder="Nam / Nữ"
            />
          </div>
          <div className="info-row">
            <p>Địa chỉ</p>
            <input
              name="location"
              value={trainer.location || ''}
              onChange={handleChange}
              placeholder="Nhập địa chỉ..."
            />
          </div>
          <div className="info-row">
            <p>Chuyên môn</p>
            <input
              name="specialty"
              value={trainer.specialty || ''}
              onChange={handleChange}
              placeholder="Gym / Yoga / Dinh dưỡng..."
            />
          </div>
          <div className="info-row">
            <p>Kinh nghiệm</p>
            <input
              name="experience"
              value={trainer.experience || ''}
              onChange={handleChange}
              placeholder="VD: 3 năm kinh nghiệm"
            />
          </div>
          <div className="info-row">
            <p>Mô tả bản thân</p>
            <textarea
              name="description"
              rows={3}
              value={trainer.description || ''}
              onChange={handleChange}
              placeholder="Giới thiệu ngắn về phong cách huấn luyện..."
            />
          </div>
        </section>

        <section className="info-section">
          <h3>💰 BẢNG GIÁ HUẤN LUYỆN</h3>
          <div className="price-grid">
            <div className="price-item">
              <p>1 buổi</p>
              <input
                type="number"
                name="oneSession"
                value={trainer.prices?.oneSession || ''}
                onChange={handlePriceChange}
              />
            </div>
            <div className="price-item">
              <p>3–7 buổi</p>
              <input
                type="number"
                name="threeToSeven"
                value={trainer.prices?.threeToSeven || ''}
                onChange={handlePriceChange}
              />
            </div>
            <div className="price-item">
              <p>1 tháng</p>
              <input
                type="number"
                name="monthly"
                value={trainer.prices?.monthly || ''}
                onChange={handlePriceChange}
              />
            </div>
          </div>
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
