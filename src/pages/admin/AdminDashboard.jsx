import React, { useEffect, useState } from 'react'
import '../../styles/pages/AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [trainers, setTrainers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAllData = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Không tìm thấy token đăng nhập!')

      const [usersRes, trainersRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/admin/trainers', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      const usersData = await usersRes.json()
      const trainersData = await trainersRes.json()

      if (!usersRes.ok) throw new Error(usersData.message || 'Lỗi tải Users')
      if (!trainersRes.ok)
        throw new Error(trainersData.message || 'Lỗi tải Trainers')

      setUsers(usersData.users || [])
      setTrainers(trainersData.trainers || [])
      setFiltered(usersData.users || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  useEffect(() => {
    const lower = searchTerm.toLowerCase()
    const list = activeTab === 'users' ? users : trainers
    setFiltered(
      list.filter(
        (item) =>
          item.username?.toLowerCase().includes(lower) ||
          item.email?.toLowerCase().includes(lower)
      )
    )
  }, [searchTerm, activeTab, users, trainers])

  const fetchDetails = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const endpoint =
        activeTab === 'trainers'
          ? `http://localhost:5000/api/admin/trainers/${id}`
          : `http://localhost:5000/api/admin/users/${id}`
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      if (data.user && data.healthInfo) {
        data.user.height = data.healthInfo.height
        data.user.weight = data.healthInfo.weight
        data.user.bmi = data.healthInfo.bmi
        data.user.bmiCategory = data.healthInfo.bmiCategory
      }

      setSelected(data.trainer || data.user || null)
    } catch (err) {
      alert('❌ Lỗi tải chi tiết: ' + err.message)
    }
  }

  // 🔹 Dữ liệu doanh thu mẫu
  const revenueData = {
    totalBuyers: 13,
    plans: [
      { name: '1 ngày', buyers: 7, price: 20000 },
      { name: '7 ngày', buyers: 4, price: 40000 },
      { name: '1 tháng', buyers: 2, price: 60000 }
    ]
  }
  const totalRevenue = revenueData.plans.reduce(
    (sum, plan) => sum + plan.buyers * plan.price,
    0
  )

  if (loading) return <div className="admin-loading">⏳ Đang tải...</div>
  if (error)
    return (
      <div className="admin-error">
        ❌ {error} <button onClick={fetchAllData}>Thử lại</button>
      </div>
    )

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="logo"
          />
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => {
              setActiveTab('users')
              setFiltered(users)
            }}
          >
            👥 Quản lý Users
          </button>
          <button
            className={activeTab === 'trainers' ? 'active' : ''}
            onClick={() => {
              setActiveTab('trainers')
              setFiltered(trainers)
            }}
          >
            🏋️ Quản lý Trainers
          </button>
          <button
            className={activeTab === 'revenue' ? 'active' : ''}
            onClick={() => setActiveTab('revenue')}
          >
            💰 Doanh thu
          </button>
          <hr />
          <button onClick={() => alert('Đăng xuất!')}>🚪 Đăng xuất</button>
        </nav>
      </aside>

      {/* Content */}
      <main className="admin-content">
        {activeTab === 'revenue' ? (
          <div className="revenue-section">
            <h1>💰 Báo cáo Doanh thu</h1>
            <p className="revenue-summary">
              Tổng số người mua gói: <b>{revenueData.totalBuyers}</b>
            </p>

            <div className="revenue-table">
              <table>
                <thead>
                  <tr>
                    <th>Gói</th>
                    <th>Số người mua</th>
                    <th>Giá (VND)</th>
                    <th>Doanh thu (VND)</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.plans.map((plan) => (
                    <tr key={plan.name}>
                      <td>{plan.name}</td>
                      <td>{plan.buyers}</td>
                      <td>{plan.price.toLocaleString()}</td>
                      <td>{(plan.buyers * plan.price).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="revenue-total">
              Tổng doanh thu: <b>{totalRevenue.toLocaleString()} đ</b>
            </div>
          </div>
        ) : (
          <>
            <header className="content-header">
              <h1>
                {activeTab === 'users'
                  ? '👥 Danh sách Users'
                  : '🏋️ Danh sách Trainers'}
              </h1>
              <div className="content-stats">
                <span>Tổng: {filtered.length}</span>
                <button onClick={fetchAllData}>🔄 Làm mới</button>
              </div>
            </header>

            <div className="admin-search">
              <input
                type="text"
                placeholder="🔍 Tìm theo email hoặc username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input"
              />
            </div>

            <div className="admin-grid-cards">
              {filtered.map((item) => (
                <div
                  key={item.id || item._id}
                  className="admin-card"
                  onClick={() => fetchDetails(item.id || item._id)}
                >
                  <img
                    src={
                      item.image
                        ? item.image.startsWith('http')
                          ? item.image
                          : `http://localhost:5000${item.image}`
                        : 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
                    }
                    alt={item.username}
                    className="admin-avatar"
                  />
                  <h3>{item.username}</h3>
                  <p>{item.email}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* 🔹 Modal chi tiết */}
      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              Thông tin chi tiết
              <span className="role-badge">
                {selected.role === 'pt'
                  ? '🏋️ Trainer'
                  : selected.role === 'admin'
                  ? '🧩 Admin'
                  : '👤 User'}
              </span>
            </h2>
            <table className="detail-table">
              <tbody>
                <tr>
                  <th>Tên người dùng</th>
                  <td>{selected.username}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{selected.email}</td>
                </tr>
                <tr>
                  <th>Số điện thoại</th>
                  <td>{selected.phone || 'Chưa có'}</td>
                </tr>
                <tr>
                  <th>Chiều cao</th>
                  <td>
                    {selected.height ? `${selected.height} cm` : 'Chưa có'}
                  </td>
                </tr>
                <tr>
                  <th>Cân nặng</th>
                  <td>
                    {selected.weight ? `${selected.weight} kg` : 'Chưa có'}
                  </td>
                </tr>
                <tr>
                  <th>BMI</th>
                  <td>
                    {selected.bmi
                      ? `${selected.bmi} (${selected.bmiCategory})`
                      : 'Chưa tính'}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="close-btn" onClick={() => setSelected(null)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
